package dh.backend.mojarra_tours.mapper;

import dh.backend.mojarra_tours.dto.UserDto;
import dh.backend.mojarra_tours.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public static UserDto mapToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getGrade(),
                user.getLevel(),
                user.getIsAdmin(),
                user.getImageUrl()
        );
    }

    public static User mapToUser(UserDto userDto) {
        User user = new User(
                userDto.getId(),
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPhone(),
                userDto.getGrade(),
                null,
                userDto.getIsAdmin(),
                userDto.getImageUrl()
        );

        user.setLevel(user.getGrade().getLevel());

        return user;
    }
}
