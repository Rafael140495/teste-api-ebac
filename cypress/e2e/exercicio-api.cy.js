/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
    cy.token('rafael@qa.com.br', 'teste').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    }) 
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) =>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    }) 
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    const nome = 'Usuário Teste'
    const senha = 'teste123'
    const administrador = 'true'
    let email = Math.floor(Math.random() * 1000000000000) + 'email@teste.com.br';
    cy.cadastrarUsuario(nome, email, senha, administrador)
    .should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    }) 
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    const nome = 'Usuário Teste'
    const senha = 'teste123'
    const administrador = 'true'
    const email = 'bethania@mpb.com.br'
    cy.cadastrarUsuario(nome, email, senha, administrador)
    .should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
    }) 
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    const nome = 'Usuário Teste'
    const senha = 'teste123'
    const administrador = 'true'
    let email = Math.floor(Math.random() * 1000000000000) + 'email@teste.com.br';
    cy.cadastrarUsuario(nome, email, senha, administrador)
      .then(response =>{
        let id = response.body._id
        cy.request({
      method: 'PUT',
      url: `usuarios/${id}`,
      body: {
        "nome": nome,
        "email": email,
        "password": senha,
        "administrador": administrador,
      }
    }).should(response =>{
      expect(response.body.message).to.equal('Registro alterado com sucesso')
      expect(response.status).to.equal(200)
    })
    })

     
  });

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    const nome = 'Usuário Teste'
    const senha = 'teste123'
    const administrador = 'true'
    let email = Math.floor(Math.random() * 1000000000000) + 'email@teste.com.br';
    cy.cadastrarUsuario(nome, email, senha, administrador)
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: {authorization: token}
        }).should(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
        })
      })
  });


});
