import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/42350844?s=460&u=5be2a86ed6eb70245577086ac585361c9cc93d48&v=4" alt="Cassio Oliveira"/>
        <div>
          <strong>Cassio Oliveira</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusianta das melhores tecnologias de química avançada.
        <br/><br/>
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas passaram pelas suas explosões.

        <footer>
          <p>
            Preço/hora
            <strong>R$ 100,00</strong>
          </p>
          
          <button type="button">
            <img src={whatsappIcon} alt="Entrar em contato"/>
            Entrar em contato
          </button>
        </footer>
      </p>
    </article>
  )
}

export default TeacherItem;