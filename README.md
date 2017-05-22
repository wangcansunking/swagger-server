# swagger-server

![alt tag](https://github.com/BaiwangTradeshift/swagger-server/blob/master/wiki/architecture.png?raw=true)

## Doc Ui

We use `swagger ui` as the ui show.
 
### maven config (Java)

#### Step 0: change parent

```
    <parent>
        <groupId>com.baiwangmaoyi</groupId>
        <artifactId>backend-parent</artifactId>
        <version>1.16</version>
    </parent>
```
 
#### Step 1: Dependency
 
 ```
    <!--swagger-->
    <dependency>
        <groupId>io.swagger</groupId>
        <artifactId>swagger-jersey2-jaxrs</artifactId>
        <version>1.5.0</version>
        <scope>compile</scope>
    </dependency>
```

#### Step 2: update Plugin

Reference: [How to Use Plugin](https://github.com/kongchen/swagger-maven-plugin)

Some configurations have been filled in common. So just configure some project-related.

**Attention**:remember to change **version** to away from covering others doc. 
```
            <plugin>
                <groupId>com.github.kongchen</groupId>
                <artifactId>swagger-maven-plugin</artifactId>
                <configuration>
                    <apiSources>
                        <apiSource>
                            <locations>
                                com.baiwangmaoyi.ap.rest //your rest folder
                            </locations>
                            <info>
                                <title>test</title> // the doc name
                                <version>1.0.0</version> //the doc version
                            </info>
                        </apiSource>
                    </apiSources>
                </configuration>
            </plugin>
```

### Step 3: Java Code Annotations

Reference: [Swagger Annotations](https://github.com/swagger-api/swagger-core/wiki/Annotations-1.5.X)

```
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Find incoming invoice list", response = InvoiceInputDTO.class, responseContainer = "List")
    @ApiResponses(@ApiResponse(code = 500, message = "internal error"))
```

### Step 4: upload generated json file

#### Step 4.1: 

run `mvn clean compile -DskipTests`

#### Step 4.2: 

Download `api.js` in the `related` folder, and put it on your project root directory such as `SC-Invoice-Input/`.

#### Step 4.3:

1. temp version: run `node api.js`
2. stable version(we must on `master` branch): run `node api.js -stable` 

### visit [UI](http://172.16.30.90:3001/)

### TODOs

1. authentication setting
2. material UI
