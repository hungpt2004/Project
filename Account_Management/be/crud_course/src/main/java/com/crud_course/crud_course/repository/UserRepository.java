package com.crud_course.crud_course.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crud_course.crud_course.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
}
