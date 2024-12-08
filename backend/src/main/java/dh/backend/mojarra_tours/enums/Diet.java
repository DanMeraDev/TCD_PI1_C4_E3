package dh.backend.mojarra_tours.enums;

public enum Diet {
    NORMAL("Proteína animal y vegetales"),
    VEGETARIAN("Vegetariano"),
    VEGAN("Vegano"),
    GLUTEN_FREE("Sin Gluten");

    private final String fullName;

    Diet(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
