@echo off
set REACT_PATH=frontend_clean_ui
set SPRING_STATIC_PATH=src\main\resources\static

echo Cleaning old static files...
rmdir /s /q %SPRING_STATIC_PATH%
mkdir %SPRING_STATIC_PATH%

echo Building React app...
cd %REACT_PATH%
call npm run build
cd ..

echo Copying build files to Spring Boot static folder...
xcopy /E /I /Y %REACT_PATH%\dist\* %SPRING_STATIC_PATH%\

echo ✅ Frontend build copied successfully!
pause
