import styles from './createAccount.module.css';
import React, { FormEvent } from 'react';
import { setUpAPICLient } from '../../api/api'
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';


const CreateAccount: React.FC = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cpfField, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    async function handleRegister(event: FormEvent){
        event.preventDefault()

        if(name === '' || email === '' || password === '' || repeatPassword === '' || phone === '' || cpfField === ''){
            toast.warning("Preencha todos o campos!")
            return 
        }

        if(password !== repeatPassword){
            toast.error("As senhas não correspondem")
            return
        }

        if(phone.length < 14){
            toast.warning("Número de telefone inválido!")
            return
        }

        if(!cpf.isValid(cpfField)){
            toast.warning("Número de CPF inválido!")
            return
        }

        if(validateEmail(email)){
            const apiClient = setUpAPICLient()

            if(await emailExists(email) == true){
                toast.error("Email já cadastrado")
                return
            }

            try{
                const user = await apiClient.post('/user', {
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    cpf: cpfField
                })

                toast.success("Cadastro realizado com sucesso!")
                
                navigate('/')
    
            }catch(error){
                toast.error("Erro ao cadastrar usuário")
                return
            }

        }else{
            toast.error("Email inválido")
            return
        }

        setName('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }

    async function emailExists(email: string): Promise<Boolean>{
        const apiClient = setUpAPICLient()

        try{
            const user = await apiClient.post('/verifyEmail',{
                email: email
            })

            if(user){
                return false
            }

            return true

        }catch(error){
            return false
        }

    }

    function validateEmail(email: string){
        const regex =  /\S+@\S+\.\S+/;

        return regex.test(email)
    }

  return (
    <div className={styles.container}>
      <div className={styles.logoArea}>
        <img className={styles.logo} src='logo.png' alt='logo' />
      </div>
      <div className={styles.containerLogin}>
        <div className={styles.containerTextLogin}>
          <h2 className={styles.textLogin}>Cadastro</h2>
        </div>
        <form className={styles.containerFormLogin}>
          <label className={styles.label}>Nome</label>
          <input className={styles.inputLogin} type="text" placeholder="Nome completo"  value={name}  onChange={(e) => { setName(e.target.value)}} />
          <label className={styles.label}>Email</label>
          <input className={styles.inputLogin} type="email" placeholder="email@email.com"  value={email}  onChange={(e) => { setEmail(e.target.value)}} />
          <label className={styles.label}>Telefone</label>
          <InputMask className={styles.inputLogin} mask="(99) 99999-9999" type="tel" value={phone}  placeholder='(00) 00000-0000' onChange={(e) => { setPhone(e.target.value)}}/>
          <label className={styles.label}>CPF</label>
          <InputMask className={styles.inputLogin} mask="999.999.999-99" type="text" value={cpfField}  placeholder='000.000.000-00' onChange={(e) => { setCpf(e.target.value)}}/>
          <label className={styles.label}>Senha</label>
          <input className={styles.inputLogin} type="password" placeholder="************"  value={password}  onChange={(e) => { setPassword(e.target.value)}} />
          <label className={styles.label}>Repetir senha</label>
          <input className={styles.inputLogin} type="password" placeholder="************"  value={repeatPassword}  onChange={(e) => { setRepeatPassword(e.target.value)}} />
          <button className={styles.btnLogin} onClick={handleRegister}>Cadastrar</button>
         
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;