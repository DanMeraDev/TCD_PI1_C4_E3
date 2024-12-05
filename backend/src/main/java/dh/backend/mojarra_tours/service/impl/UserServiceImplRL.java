package dh.backend.mojarra_tours.service.impl;
import dh.backend.mojarra_tours.dto.UserDto;
import dh.backend.mojarra_tours.dto.UserRegisterDTO;
import dh.backend.mojarra_tours.dto.UserLoginDTO;
import dh.backend.mojarra_tours.dto.UserResponseDTO;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.mapper.UserMapper;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.service.UserService;
import dh.backend.mojarra_tours.mapper.UserMapperRL;
import dh.backend.mojarra_tours.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;
@Service
public class UserServiceImplRL implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapperRL userMapper;

    @Autowired UserMapper userEntityMapper;

    @Autowired
    private JwtUtil jwtUtil;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Método para registrar un usuario
    @Override
    public UserDto register(UserRegisterDTO userRegisterDTO) {
        // Validar que el email tenga el formato correcto
        if (!EMAIL_PATTERN.matcher(userRegisterDTO.getEmail()).matches()) {
            throw new IllegalArgumentException("Email inválido");
        }

        // Validar que el password tenga una longitud mínima
        if (userRegisterDTO.getPassword().length() < 6) {
            throw new IllegalArgumentException("El password debe tener al menos 6 caracteres");
        }

        // Validar que el email no esté registrado
        if (userRepository.existsByEmail(userRegisterDTO.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        // Mapear el DTO a la entidad User

        User user = userMapper.toEntity(userRegisterDTO);
        user.setLevel(userRegisterDTO.getGrade().getLevel());

        // Encriptar la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));

        // Guardar el usuario
        userRepository.save(user);

        return UserMapper.mapToDto(user);
    }

    // Método para login de un usuario
    @Override
    public UserResponseDTO login(UserLoginDTO userLoginDTO) {
        // Buscar el usuario por email
        User user = userRepository.findByEmail(userLoginDTO.getEmail());

        if (user == null || !passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
            return null; // Usuario no encontrado o contraseña incorrecta
        }

        String token = jwtUtil.generateToken(user.getId().toString(), user.getIsAdmin(), user.getGrade());

        // Mapea el usuario autenticado a UserResponseDTO
        UserResponseDTO responseDTO = userMapper.toResponseDTO(user);
        responseDTO.setToken(token); // Asigna el token generado

        // Mapear el usuario a UserResponseDTO
        return responseDTO;
    }
}
