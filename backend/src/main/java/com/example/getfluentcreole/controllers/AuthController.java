package com.example.getfluentcreole.controllers;

import com.example.getfluentcreole.dto.UserDTO;
import com.example.getfluentcreole.dto.request.AuthRequestDTO;
import com.example.getfluentcreole.dto.request.TokenValidationRequestDTO;
import com.example.getfluentcreole.dto.request.UserRequestDTO;
import com.example.getfluentcreole.dto.response.AuthResponseDTO;
import com.example.getfluentcreole.dto.response.UserResponseDTO;
import com.example.getfluentcreole.services.CustomUserDetailsService;
import com.example.getfluentcreole.services.TokenBlacklistService;
import com.example.getfluentcreole.services.UserService;
import com.example.getfluentcreole.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.antlr.v4.runtime.Token;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class AuthController {

    private final ModelMapper modelMapper;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final TokenBlacklistService tokenBlacklistService;


    public AuthController(ModelMapper modelMapper, UserService userService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, CustomUserDetailsService customUserDetailsService, TokenBlacklistService tokenBlacklistService) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public UserResponseDTO createNewUser(@Valid @RequestBody UserRequestDTO userRequest) {
        UserDTO userDTO = mapToUserDTO(userRequest);
        userDTO = userService.createUser(userDTO);
        return mapToUserResponse(userDTO);
    }

    @PostMapping("/login")
    public AuthResponseDTO authenticateUserProfile(@RequestBody AuthRequestDTO authRequest) throws Exception {
        authenticate(authRequest);
        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getEmailAddress());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return new AuthResponseDTO(token, authRequest.getEmailAddress());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout")
    public void logOut(HttpServletRequest request) {
        String jwtToken = extractJwtTokenFromRequest(request);
        if (jwtToken != null) {
            tokenBlacklistService.addTokenToBlacklist(jwtToken);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<String> checkTokenValidity(@RequestBody TokenValidationRequestDTO tokenValidationRequest) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(tokenValidationRequest.getEmailAddress());
        if (jwtTokenUtil.validateToken(tokenValidationRequest.getToken(), userDetails)) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is invalid or expired");
        }
    }

    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void authenticate(AuthRequestDTO authRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmailAddress(), authRequest.getPassword()));
        } catch (DisabledException ex) {
            throw new Exception("Profile is disabled", ex);
        }
    }

    private UserDTO mapToUserDTO(UserRequestDTO userRequestDTO) {
        return modelMapper.map(userRequestDTO, UserDTO.class);
    }

    private UserResponseDTO mapToUserResponse(UserDTO userDTO) {
        return modelMapper.map(userDTO, UserResponseDTO.class);
    }
}
