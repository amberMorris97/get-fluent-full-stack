package com.example.getfluentcreole.dto.response;

public class AuthResponseDTO {

    private String token;
    private String emailAddress;

    public AuthResponseDTO() {}

    public AuthResponseDTO(String token, String emailAddress) {
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
