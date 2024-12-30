package com.example.SmartParkingSystem.Security;

import com.example.SmartParkingSystem.services.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.ExpiredJwtException;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JWTAuthenticationFilter(JWTService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            final int tokenStartIndex = 7;
            String jwt = authorizationHeader.substring(tokenStartIndex);

            try {
                final String email = jwtService.extractEmail(jwt);
                String role = jwtService.extractRole(jwt);
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if (email != null && authentication == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    System.out.println("JWT Filter - UserDetails authorities: " + userDetails.getAuthorities()); // Add this

                    if (jwtService.isValidToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()  // This will now contain the correct role
                                );
                        System.out.println("JWT Filter - Setting authentication with authorities: " + authToken.getAuthorities()); // Add this

                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            } catch (ExpiredJwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token has expired");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
