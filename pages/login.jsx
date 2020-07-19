import axios from 'axios'
import { URL_API } from '../utils/config'
import { useState } from 'react'
// import { setCookie } from 'react-cookie'
import { Cookies } from 'react-cookie'
import Router from 'next/router'

<style jsx>{`
    .erro {
        dispaly:none;
        color: red;
        font-weight: bold;
    }
`}</style>

export default function Login() {

    const msgError = true

    //variavel de destado com login e senha do usuario
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function onChange(e) {//capta as informações dos inputs

        const { name, value } = e.target

        setUser({ ...user, [name]: value })

    }
    async function onSubmit(e) {

        e.preventDefault()
        //vai fazer uma chamada ajax na api passando os dados coletados no formulario abaixo
        try {

            const cookie = new Cookies()
            const response = await axios.post(URL_API + '/login', user)
            cookie.set('token', response.data.token)
            Router.push('/admin')
            

        } catch (error) {
                function Error(){
                    document.getElementById('msg').style.display = "flex"
                }
            // alert('Deu erro, login falhou !')
        }
    }
    return (
        <section className="hero">
            <div className="container">
                <form onSubmit={onSubmit}>
                    <h1 className="is-size-1 has-text-centered">Área restrita</h1>
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                            <input className="input is-medium" type="email" name="email" value={user.email} onChange={onChange} placeholder="Informe seu E-mail" />
                            <span className="icon is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-right">
                                <i className="fas fa-check fa-sm"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                            <input className="input is-medium" type="password" name="password" value={user.password} onChange={onChange} placeholder="Informe sua senha" />
                            <span className="icon is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                            <span className="icon is-right">
                                <i className="fas fa-check fa-sm"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-link">entrar</button>
                        </div>
                    </div>
                </form>
                {/* <div id="msg" className="erro">Deu Erro seu login falhou...</div> */}
            </div>
            <div>
                {JSON.stringify(user)}
            </div>
        </section>
    )
}