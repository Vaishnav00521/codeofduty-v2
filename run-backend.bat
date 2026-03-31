@echo off
echo Starting CodeOfDuty Backend...
cd "%~dp0backend"
"C:\Users\vaish\.m2\wrapper\dists\apache-maven-3.9.12-bin\5nmfsn99br87k5d4ajlekdq10k\apache-maven-3.9.12\bin\mvn.cmd" spring-boot:run
pause
