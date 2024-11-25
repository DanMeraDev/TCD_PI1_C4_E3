package dh.backend.mojarra_tours.util;

import dh.backend.mojarra_tours.enums.Grade;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "your_secret_key"; // Clave secreta para firmar el token

    // Generar token con claims personalizados
    public String generateToken(String userId, boolean isAdmin, Grade grade) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("isAdmin", isAdmin);

        // Verificar si grade es null antes de guardarlo
        if (grade != null) {
            claims.put("grade", grade.name()); // Guardar como String
        } else {
            // Si el grade es null, asignar un valor predeterminado
            claims.put("grade", Grade.DEFAULT.name()); // Asignamos un valor predeterminado
        }

        return createToken(claims, userId);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        // Crear un HashMap mutable basado en los claims
        Map<String, Object> mutableClaims = new HashMap<>(claims);

        return Jwts.builder()
                .setClaims(mutableClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas de expiración
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Validar token y usuario
    public boolean validateToken(String token, String userId) {
        try {
            String username = extractClaim(token, Claims::getSubject);
            return username.equals(userId) && !isTokenExpired(token);
        } catch (SignatureException e) {
            return false; // Token inválido por firma incorrecta
        }
    }

    // Verificar si el token ha expirado
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    // Extraer información específica del token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extraer todos los claims del token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    // Extraer el rol isAdmin del token
    public boolean extractIsAdmin(String token) {
        return extractClaim(token, claims -> claims.get("isAdmin", Boolean.class));
    }

    // Extraer el grade del token
    public Grade extractGrade(String token) {
        String gradeString = extractClaim(token, claims -> claims.get("grade", String.class));

        // Verificar si el valor extraído es null o no corresponde a un valor válido del enum
        if (gradeString != null) {
            try {
                // Intentar convertir la cadena extraída a un valor del enum Grade
                return Grade.valueOf(gradeString);
            } catch (IllegalArgumentException e) {
                // Si el valor no es válido para el enum, devolver un valor predeterminado
                return Grade.DEFAULT; // Valor predeterminado cuando no es válido
            }
        } else {
            // Si el valor es null, devolver un valor predeterminado
            return Grade.DEFAULT; // Valor predeterminado cuando el valor es null
        }
    }
}

