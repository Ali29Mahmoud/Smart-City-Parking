package com.example.SmartParkingSystem.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JWTService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    public String generateToken(String email) {
        final int millisInADay = 86400000;
        return Jwts.builder()
                .setSubject(email)
                .setIssuer("Parker")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + millisInADay))
                .signWith(generateSecretKey())
                .compact();
    }

    private SecretKey generateSecretKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String extractEmail(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(generateSecretKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }

    public boolean isValidToken(String jwt, UserDetails userDetails) {
        String email = extractEmail(jwt);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(jwt);
    }

    private boolean isTokenExpired(String jwt) {
        return extractExpirationDate(jwt).before(new Date());
    }

    private Date extractExpirationDate(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(generateSecretKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getExpiration();
    }
}
