## API Node.js com Serverless Framework em ambiente AWS

Repositório criado para acompanhar o Live Coding da Digital Innovation One - DIO. Neste projeto foi replicado a solução implementado pelo expert que tinha a proposta de criar uma infraestrutra em nuvem AWS com os seguintes serviços: API Gateway, DynamoDB, AWS Lambda e AWS CloudFormation utilizando o framework Serverless para desevolver o projeto base e subir os serviços para nuvem. Além do que foi apresentado no curso, decidi completar o CRUD da aplicação criando também uma função de deletar um usuário.


Etapas:

1) Pré requisitos

- Possuir uma conta na AWS e instalar Node.js na máquina;
- Instalar o AWS CLI;
- IDE de sua preferência;

2) Passo-a-passo

- Credenciais AWS

	Criar usuário: AWS Management Console -> IAM Dashboard -> Create New User -> <nome do usuário> -> Permissions "Administrator Access" -> Programmatic Access -> Dowload Keys

	No terminal: $ aws configure -> colar as credenciais geradas anteriormente

- Configurar o framework Serverless

	No terminal: $ npm i -g serverless

- Desenvolvimento do projeto

	No terminal: $ serverless     --> para iniciar um projeto base
	
	$ npm install uuid     --> dependencias necessárias
	
	$ npm install aws-sdk  --> dependencias necessárias
	
	$ serverless deploy    --> realiza o deploy na nuvem da AWS


3) Algumas configurações realizadas no arquivo serverless.yml

- No arquivo serverless.yml adicionar a região < region: sa-east-1 > dentro do escopo de provider:

	Ex:


		provider:
			.
			.
			region: sa-east-1

	OBS: sempre que fizer alguma alteração no código realizar o comando '$ serverless deploy' para atualizar na nuvem da AWS.


- Para configurar o banco de dados:


		resources:
  		 Resources:
		  ItemTable:
		   Type: AWS::DynamoDB::Table
		   Properties:
		   TableName: "nameTable"
		   AttributeDefinitions:
		    - AttributeName: id
		      AttributeType: S
		   KeySchema:
		    - AttributeName: id
		      KeyType: HASH
		    BillingMode: PAY_PER_REQUEST


- Para configurar permissões de acesso:


		provider:
		 .
		 .
		 region: sa-east-
		 iam:
		  role:
		   statements:
		    - Effect: Allow
		      Action:
		       - dynamodb:PutItem
		       - dynamodb:UpdateItem
		       - dynamodb:DeleteItem
		       - dynamodb:GetItem
		       - dynamodb:Scan
		      Resource:
		       - arn:aws:dynamodb:sa-east-1:760321754040:table/users --> deve ser alterado no seu código

OBS: Para obter arn da sua tabela no DynamoDB AWS Console -> DynamoDB -> Overview -> Amazon Resource Name (ARN)


- Para configurar as funções:


		functions:
		 hello:
		  handler: src/hello.handler
		  events:
		   - httpApi:
		      path: /
		      method: get
		 insertUser:
		  handler: src/insertUser.handler
		  events:
		   - httpApi:
		      path: /users
		      method: post
		 listAllUsers:
		  handler: src/listAllUsers.handler
		  events:
		   - httpApi:
		      path: /users
		      method: get
		 listUser:
		  handler: src/listUser.handler
		  events:
		   - httpApi:
		      path: /users/{id}
		      method: get
		 updateUser:
		  handler: src/updateUser.handler
		  events:
		   - httpApi:
		      path: /users/{id}
		      method: put
		 deleteUser:
		  handler: src/deleteUser.handler
		  events:
		   - httpApi:
		      path: /users/{id}
		      method: delete
