package com.example.SmartParkingSystem.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class GmailValidationService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GmailValidationService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Fetches the email of the user from Google using the access token
     *
     */
    public String fetchGoogleEmail(String accessToken) {
        final String googleApiUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String email = null;

        try {
            ResponseEntity<String> response = restTemplate
                    .exchange(googleApiUrl, HttpMethod.GET, entity, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            email = root.path("email").asText();
        }
        catch (RestClientException | JsonProcessingException ex) {
            ex.printStackTrace();
        }

        return email;
    }

}
