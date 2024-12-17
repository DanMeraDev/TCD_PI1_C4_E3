package dh.backend.mojarra_tours.config;

import dh.backend.mojarra_tours.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Desactivar CSRF para fines de prueba
                .authorizeRequests()

                // Rutas públicas
                .requestMatchers("/auth/**", "/error", "/swagger-ui/**", "/v3/api-docs/**").permitAll()

                // Rutas accesibles para usuarios autenticados (solo lectura)
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                .requestMatchers("/api/reservations/**","/api/favorites/**","/api/user/{userId}/profile-image").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/{userId}/profile-image").authenticated()
                // Rutas restringidas solo para administradores
                .requestMatchers(HttpMethod.POST, "/api/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/**").hasAuthority("ROLE_ADMIN")

                // Cualquier otra solicitud es denegada
                .anyRequest().denyAll()

                .and()
                // Agregar el filtro JWT antes del filtro de autenticación predeterminado
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
