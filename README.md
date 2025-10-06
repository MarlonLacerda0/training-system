# 🏋️‍♂️ Training System

O **Training System** é uma aplicação web desenvolvida em **Next.js** e **TypeScript**, com integração ao **Supabase** para autenticação e gerenciamento de banco de dados.  
O sistema tem como objetivo gerar e gerenciar **planos de treino personalizados**, oferecendo uma interface moderna, responsiva e fácil de usar.

---

## 🚀 1. Objetivo do Projeto

O projeto foi desenvolvido como parte de um trabalho acadêmico, com foco em demonstrar a aplicação de conceitos de **desenvolvimento web full stack**, **integração com serviços em nuvem** e **boas práticas de arquitetura de software**.

---

## 🧠 2. Principais Funcionalidades

- Autenticação de usuários (login, cadastro e logout) via Supabase  
- Criação e gerenciamento de treinos personalizados  
- Armazenamento de dados no banco PostgreSQL  
- Interface moderna e responsiva desenvolvida em Next.js  
- Estrutura modular que facilita manutenção e escalabilidade  

---

## 🧩 3. Tecnologias Utilizadas

O sistema foi desenvolvido com base em tecnologias modernas para garantir **eficiência, segurança e escalabilidade**:

- **Frontend:** [Next.js](https://nextjs.org/) com **React** e **TypeScript**, para a criação de uma interface dinâmica e responsiva  
- **Backend:** **TypeScript**, responsável pelas regras de negócio e geração dinâmica de treinos  
- **Banco de Dados:** **PostgreSQL**, gerenciado via **Supabase**  
- **Integrações:** **Supabase**, utilizado para autenticação, gerenciamento de usuários e conexão com o banco  
- **Hospedagem:** **Vercel**, responsável pelo deploy e gerenciamento da aplicação na nuvem  

---

## 🏗️ 4. Arquitetura do Sistema

O projeto segue uma arquitetura **modular e escalável**, organizada da seguinte forma:

- **Frontend:**  
  Desenvolvido em **Next.js (React + TypeScript)**, responsável por toda a camada de interface do usuário.  
  Os componentes são reutilizáveis e organizados dentro da pasta `app/`.

- **Backend:**  
  Implementado com **TypeScript**, integrado ao Supabase, centralizando as regras de negócio e a lógica de geração dos treinos.

- **Banco de Dados:**  
  Utiliza **PostgreSQL** hospedado no **Supabase**, armazenando dados de usuários, planos de treino e histórico de atividades.

- **Deploy:**  
  Feito na **Vercel**, que oferece CI/CD integrado com o GitHub e garante alta disponibilidade da aplicação.



