# Use Java 17 with Maven pre-installed
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml first (for dependency caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the app
RUN mvn clean package -DskipTests

# ── Runtime stage ──
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy built jar
COPY --from=build /app/target/know-everything-api-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Run
ENTRYPOINT ["java", "-jar", "app.jar"]