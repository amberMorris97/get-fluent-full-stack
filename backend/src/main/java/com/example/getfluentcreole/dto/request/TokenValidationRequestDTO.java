package com.example.getfluentcreole.dto.request;

public class TokenValidationRequestDTO {
    private String token;
    private String emailAddress;

    public TokenValidationRequestDTO() {}

    public TokenValidationRequestDTO(String token, String emailAddress) {
        this.token = token;
        this.emailAddress = emailAddress;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
