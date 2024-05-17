## This is a Backend javascript application.

### Simple invetantary gestion API created with Node, Express and Mysql.

Steps for install.

Run npm install in the proyect and run npm start to start the server.

Configure the database.


The API has the routes: 

##### /products 
{
    method: get 
    response: A list of the products 
}

##### /products/id

{ 
    method: get
    response: A product based in his id
}
##### /products 
{
    method:post
    need: body {nombre:"", precio:"", inventario:""}
    response: check if the create has been successfull

}

##### products/id 
{
    method: put
    need: body{nombre:"", precio:"", inventario:""}
    response: Check if the update has been successfull
}

##### products/id
{
    method:delete
    response: Check if the delete has been successfull
}