package dh.backend.mojarra_tours.security;

import dh.backend.mojarra_tours.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Autowired
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = getTokenFromRequest(request);

        try {
            if (token != null && jwtUtil.validateToken(token, jwtUtil.extractClaim(token, claims -> claims.getSubject()))) {
                String userId = jwtUtil.extractClaim(token, claims -> claims.getSubject());
                boolean isAdmin = jwtUtil.extractIsAdmin(token);

                // Asignar rol basado en isAdmin
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(isAdmin ? "ROLE_ADMIN" : "ROLE_USER");

                // Crear autenticación
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userId,
                        null,
                        Collections.singletonList(authority) // Asignar el rol
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establecer contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Loggear o manejar errores de validación (opcional)
            System.err.println("Error en validación del token: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
