package dh.backend.mojarra_tours.service.impl;

import dh.backend.mojarra_tours.dto.UserDto;
import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.mapper.UserMapper;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.service.IUserService;
import dh.backend.mojarra_tours.service.ImageStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {
    private static Logger LOGGER = LoggerFactory.getLogger(TourServiceImpl.class);
    @Autowired

    private final UserRepository userRepository;
    private final ImageStorageService imageStorageService;

    public UserServiceImpl(UserRepository userRepository, ImageStorageService imageStorageService) {
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }

    @Override
    public UserDto createUser(User user) {
        user.setLevel(user.getGrade().getLevel());
        User savedUser = userRepository.save(user);
        return UserMapper.mapToDto(savedUser);
    }

    @Override
    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(UserMapper::mapToDto)
                .or(() -> {
                    throw new ResourceNotFoundException("User not found!");
                });
    }

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(UserMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public void updateUser(UserDto userDto) {
        User currentUser = userRepository.findById(userDto.getId())
                .orElseThrow(()->
                        new ResourceNotFoundException("No user found with the given id: "+ userDto.getId()));
        if(userDto.getName()!=null){
            currentUser.setName(userDto.getName());

        }
        if(userDto.getEmail()!=null){
            currentUser.setEmail(userDto.getEmail());
        }
        if(userDto.getGrade()!=null){
            currentUser.setGrade(userDto.getGrade());
            currentUser.setLevel(currentUser.getGrade().getLevel());
        }
        if(userDto.getIsAdmin()!=null){
            currentUser.setIsAdmin(userDto.getIsAdmin());
        }
        if(userDto.getPhone()!=null){
            currentUser.setPhone(userDto.getPhone());
        }
        User updatedUser = userRepository.save(currentUser);
        LOGGER.info("USER UPDATED" + updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(id);
        }
    }
    @Override
    public UserDto updateProfileImage(Long userId, MultipartFile imageFile) throws IOException {
        // Buscar el usuario por ID
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found!"));

        // Subir la imagen y obtener la URL
        String imageUrl = imageStorageService.saveImage(imageFile, "user_images", userId.toString());

        // Actualizar la URL de la imagen de perfil en el usuario
        user.setImageUrl(imageUrl);

        // Guardar el usuario actualizado en la base de datos
        User updatedUser = userRepository.save(user);

        // Retornar el DTO del usuario actualizado
        return UserMapper.mapToDto(updatedUser);
    }

}
