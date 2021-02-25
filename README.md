# Lab02

Lab02 is a server balancer that iterate through 3 node.js server and balance requests amongst them.

# Clone

```bash
git clone "https://github.com/frederikblais/balancer.git"
```

# How it works
![ScreenShot](https://github.com/frederikblais/balancer/blob/main/git/objective.png)

# How to run

1. Clone the repo with git
2. run server1.js, server2.js, server3.js and balancer.js in separated command line
   
   port addresses:
   |     Server    |       Port      |
   | ------------- | --------------- |
   | balancer.js   |       9999      |
   | server1.js    |       1111      |
   | server2.js    |       2222      |
   | server3.js    |       3333      |
   
# Use case

    * Calling http://localhost:9999/hello the first time will return “Hi I'm server 1”
    * Calling http://localhost:9999/hello the second time will return “Hi I'm server 2”
    * Calling http://localhost:9999/hello the third time will return “Hi I'm server 3”
    * Calling http://localhost:9999/hello the fourth time will return “Hi I'm server 1”

#Resilience

If one of the servers is down, go to the next available one.  

Example :  
-Stop server 1  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 2”  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 3”  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 2”-Etc...  

-Stop server 2  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 1”  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 3”  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 1”-Etc...  

-Stop server 3  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 1”  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 2”  
-Calling ​http://localhost:9999/hello​ the first time will return “Hi I'm server 1”-Etc...  
