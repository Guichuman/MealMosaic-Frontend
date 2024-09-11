import styles from '../login/login.module.css';
import React, { FormEvent } from 'react';
import { setUpAPICLient } from '../../api/api'
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, Link  } from 'react-router-dom';
import emailjs from '@emailjs/browser'

const ResetPassword: React.FC = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();



  async function handleResetPassword(event: FormEvent){
    event.preventDefault()

    if(email === ''){
      toast.error("Preencha o campo de email")
      return
    }

    const templateParams = {
      from_name: "MealMosaic",
      to_name: email,
      resetCode: '123456'
    }

    try{
      console.log(emailjs.send("service_4jtlxty", "template_b6ievcy", templateParams, "b1tZXraACvNFDd2Hq"))
      toast.success("Email de recuperação enviado!")
    }catch(error){
      toast.error("Erro ao enviar email")
      throw new Error("Erro ao envair email")
    }
    setEmail('')

  }
 

  return (
    <div className={styles.container}>
      <div className={styles.logoArea}>
        <img className={styles.logo} src='logo.png' alt='logo' />
      </div>
      <div className={styles.containerLogin}>
        <div className={styles.containerTextLogin}>
          <h2 className={styles.textLogin}>Recuperar senha</h2>
        </div>
        <form className={styles.containerFormLogin}>
          <label className={styles.label}>Email</label>
          <input className={styles.inputLogin} type="text" placeholder="email@email.com" value={email}  onChange={(e) => { setEmail(e.target.value)}} />
          <button className={styles.btnLogin} onClick={handleResetPassword}>Enviar email</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
