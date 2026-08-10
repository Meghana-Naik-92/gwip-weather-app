# Stage 1: Build the application using Java 21 and Maven
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace/app

# Install Maven directly into the container
RUN apk add --no-cache maven

# Copy project description and source code
COPY pom.xml .
COPY src src

# Build the app using standard mvn
RUN mvn clean package -DskipTests

# Stage 2: Run the application using Java 21 JRE
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]