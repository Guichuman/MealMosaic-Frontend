import styles from './login.module.css';
import React, { FormEvent } from 'react';
import { setUpAPICLient } from '../../api/api'
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, Link  } from 'react-router-dom';
import CreateAccount from "../createAccount/CreateAccount"

const Login: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha todos os campos!")
      return 
    }

    const apiClient = setUpAPICLient()

    try{

      const response = await apiClient.post('/auth',{
        email: email,
        password: password
      })

      const token = response.data.data.token
      const userId = response.data.data.userId

      localStorage.setItem("Token", token)
      localStorage.setItem("userId", userId)

      toast.success("Login efetuado com sucesso!")
      navigate('/dashboard')

    }catch(err){
      toast.error("Erro ao efetuar login")
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoArea}>
        <img className={styles.logo} src='logo.png' alt='logo' />
      </div>
      <div className={styles.containerLogin}>
        <div className={styles.containerTextLogin}>
          <h2 className={styles.textLogin}>Login</h2>
        </div>
        <form className={styles.containerFormLogin}>
          <label className={styles.label}>Usuário</label>
          <input className={styles.inputLogin} type="email" placeholder="email@email.com" value={email}  onChange={(e) => { setEmail(e.target.value)}} />
          <label className={styles.label}>Senha</label>
          <input className={styles.inputLogin} type="password" placeholder="************" onChange={(e) => { setPassword(e.target.value)}} />
          <button className={styles.btnLogin} onClick={handleLogin} >Entrar</button>
          <Link to="/resetPassword" className={styles.linkLogin}>Esqueci minha senha</Link>
          <Link to="/register" className={styles.linkLogin}>Cadastre-se</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
