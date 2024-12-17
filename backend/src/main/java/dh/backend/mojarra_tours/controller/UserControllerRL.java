package dh.backend.mojarra_tours.controller;

import dh.backend.mojarra_tours.dto.UserDto;
import dh.backend.mojarra_tours.dto.UserRegisterDTO;
import dh.backend.mojarra_tours.dto.UserLoginDTO;
import dh.backend.mojarra_tours.dto.UserResponseDTO;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.enums.EmailType;
import dh.backend.mojarra_tours.mapper.UserMapper;
import dh.backend.mojarra_tours.mapper.UserMapperRL;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.service.IMailService;
import dh.backend.mojarra_tours.service.UserService;
import dh.backend.mojarra_tours.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticación", description = "Endpoints para autenticación y registro de usuario")
public class UserControllerRL {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapperRL userRLMapper;

    @Autowired
    private UserMapper userEntityMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private IMailService mailService;

    @Autowired
    private UserService userService;

    private static Logger LOGGER = LoggerFactory.getLogger(UserControllerRL.class);


    @PostMapping("/register")
    @Operation(
            summary = "Registrar usuario",
            description = "Registra un nuevo usuario en el sistema",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Objeto para registrar un nuevo usuario",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserRegisterDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Usuario registrado exitosamente"
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "El email ya está registrado"
                    )
            }
    )
    public ResponseEntity<String> registerUser(@RequestBody UserRegisterDTO userRegisterDTO) {
        // Aquí se valida y registra el usuario
        LOGGER.info("REGISTRANDO USUARIO "+userRegisterDTO);
        if (userRepository.existsByEmail(userRegisterDTO.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        UserDto userCreated = userService.register(userRegisterDTO);
        User user = UserMapper.mapToUser(userCreated);

        mailService.sendEmail(EmailType.REGISTRATION_CONFIRMATION, user);
        LOGGER.info("Enviando correo de confirmación a "+user.getEmail());
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }

    @PostMapping("/login")
    @Operation(
            summary = "Iniciar sesión",
            description = "Permite a un usuario autenticarse con su email y contraseña",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Objeto para iniciar sesión con email y contraseña",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserLoginDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Operación exitosa. Devuelve el token y los detalles del usuario",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = UserResponseDTO.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Credenciales incorrectas"
                    )
            }
    )
    public ResponseEntity<UserResponseDTO> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        // Buscar usuario por email
        UserResponseDTO userResponseDTO = userService.login(userLoginDTO);
        LOGGER.info("TRYING TO LOGIN USER " + userLoginDTO.getEmail());
        if (userResponseDTO == null) {
            return ResponseEntity.status(401).body(null);  // Error en login
        }
        LOGGER.info("LOGIN SUCCESSFUL");
        return ResponseEntity.ok(userResponseDTO);
    }
}
