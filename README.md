# 🚀 Deploy Automático da Função Lambda via GitHub Actions

Este projeto contém uma **função Lambda** em **Node.js** para consulta de CEPs, integrada a um **workflow GitHub Actions** para **deploy automático**.

## 📌 Como Funciona

Sempre que você fizer **push** no branch `main`, o **GitHub Actions** executará um fluxo de trabalho que:

1️⃣ Faz checkout do código-fonte.  
2️⃣ Configura as credenciais **AWS** usando **Secrets**.  
3️⃣ Compacta o código em um **arquivo ZIP**.  
4️⃣ Atualiza a função **Lambda** na AWS com o novo código.  

📂 O código da função Lambda está localizado na pasta `src` (`index.mjs`).

---

## 🔧 Configuração Necessária

Antes de utilizar o deploy automático, siga estas etapas:

✅ **Criar um usuário IAM na AWS** com permissão `AWSLambdaFullAccess`.  
✅ **Gerar duas chaves de acesso** para esse usuário (`Access Key ID` e `Secret Access Key`).  
✅ No repositório **GitHub**, adicione dois **Secrets**:  
   - `AWS_ACCESS_KEY_ID`: sua Access Key ID da AWS.  
   - `AWS_SECRET_ACCESS_KEY`: sua Secret Access Key da AWS.  
✅ **Verificar o nome da função Lambda** no workflow (`consultCEP`).  
✅ **Ajustar a região AWS** no workflow (`us-east-2`, por exemplo).  

---

## 🚀 Como Usar

1️⃣ Faça alterações no arquivo `index.mjs`.  
2️⃣ Realize um **commit** e um **push** para o branch `main`.  
3️⃣ Aguarde o **GitHub Actions** executar o deploy automático.  

---

## 🛠 Testes

Após o deploy, você pode testar a **função Lambda** no **AWS Console** com um evento JSON:

### 📥 Entrada Esperada:
```json
{
  "cep": "01001000"
}
```
### 📤 Saída Esperada:
```json
{
  "logradouro": "Praça da Sé",
  "bairro": "Sé",
  "cidade": "São Paulo",
  "estado": "SP"
}
```
### ❌ Em Caso de Erro (CEP inválido ou não encontrado):
```json
{
  "error": "Mensagem de erro explicativa"
}

````
## Como Testar a Function no Lambda? 

Acesse esse link, apos isso é só trocar o CEP da url pra qual você deseja consultar

https://yze4lr6i6xagqnpxgqd3eghg3e0gyqty.lambda-url.us-east-2.on.aws/?cep=01001000




