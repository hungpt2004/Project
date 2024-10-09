package com.crud_course.crud_course.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.crud_course.crud_course.exception.UserNotFoundException;
import com.crud_course.crud_course.model.User;
import com.crud_course.crud_course.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@Controller
@CrossOrigin("http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }
    
    @GetMapping("/users")
    List<User> getUser() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
    }
    
    @PutMapping("/user/{id}")
    User updateUser(
        @PathVariable Long id, 
        @RequestBody User newUser 
        ) {
        return userRepository.findById(id)
        .map(user -> {
            user.setUsername(newUser.getUsername());
            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());
            return userRepository.save(user);
        }).orElseThrow(() -> new UserNotFoundException(id))
        ;
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(
        @PathVariable Long id
    ) {
        if(!userRepository.findById(id).isPresent()){
            throw new UserNotFoundException(id);
        } else {
            userRepository.deleteById(id);
        }
        return "User with id "+id+ " are deleted";
    }

    
}
