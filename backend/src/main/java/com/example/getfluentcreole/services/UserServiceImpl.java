package com.example.getfluentcreole.services;

import com.example.getfluentcreole.dto.UserDTO;
import com.example.getfluentcreole.exceptions.ItemAlreadyExistsException;
import com.example.getfluentcreole.models.User;
import com.example.getfluentcreole.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserServiceImpl(ModelMapper modelMapper, UserRepository userRepository, PasswordEncoder encoder) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByEmailAddress(userDTO.getEmailAddress())) {
            throw new ItemAlreadyExistsException("User with email " + userDTO.getEmailAddress() + " already exists");
        }

        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        User user = mapToUserEntity(userDTO);
        user = userRepository.save(user);
        return mapToUserDTO(user);
    }

    private UserDTO mapToUserDTO(User userEntity) {
        return modelMapper.map(userEntity, UserDTO.class);
    }

    private User mapToUserEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
