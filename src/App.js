import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
/*import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";*/
import { createTodo as createTodoMutation } from "./graphql/mutations";

const App = ({ }) => {
  const [disciplinesSelected, setSelectedDisciplinas] = useState([]);
  const [nivel, setNivel] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleImageClick = (alt) => {

    const updatedDisciplinas = [...disciplinesSelected];
    const index = updatedDisciplinas.indexOf(alt);

    if (index === -1) {
      // Adiciona se não estiver selecionado
      updatedDisciplinas.push(alt);
    } else {
      // Remove se já estiver selecionado
      updatedDisciplinas.splice(index, 1);
    }
    setSelectedDisciplinas(updatedDisciplinas);
  };



  const handleDiagnosticarClick = () => {
    const newNivel = trateDiagnostico(disciplinesSelected);
    setNivel(newNivel);
    setShowResult(true);
  };

  const createTodo = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("nome"),
      email: form.get("email"),
      disciplinesSelected: (disciplinesSelected),
      description: form.get("mensagem"),
    };

    try {
      await API.graphql({
        query: createTodoMutation,
        variables: { input: data },
      });

      //alert("Dados enviados com sucesso, em breve entraremos em contato!");
      window.alert("Dados enviados com sucesso, em breve entraremos em contato!");

      // Limpa os campos do formulário
      event.target.reset();
      setSelectedDisciplinas([]);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };
  const trateDiagnostico = (selectedDisciplinas) => {
    const nivelBasicoDisciplinas = [
      "Sprint",
      "Retro",
      "Epico",
      "Planning",
      "Kaban",
      "Scrum",
      "Features",
      "Story",
      "Backlog",
    ];
    const nivelIntermediarioDisciplinas = [
      "CICD",
      "Cloud",
      "EvoArch",
      "TDD",
      "DDD",
      "AutomatTests",
      "Solid",
      "CleanArch",
      "Git",
      "DevOps",
      "Pairing",
    ];
    const nivelAvancadoDisciplinas = [
      "InnerSource",
      "DX",
      "Finops",
      "DataDriven",
      "Platform",
      "ArchAsProduct",
      "DataAsProduct",
    ];

    const disciplinasSelecionadas = disciplinesSelected.filter((disciplina) =>
      nivelBasicoDisciplinas.includes(disciplina)
    );

    let nivel = "Iniciante";

    if (disciplinasSelecionadas.length >= 3) {
      nivel = "Básico";
    }

    const disciplinasIntermediariasSelecionadas = disciplinesSelected.filter(
      (disciplina) => nivelIntermediarioDisciplinas.includes(disciplina)
    );

    if (disciplinasIntermediariasSelecionadas.length >= 3) {
      nivel = "Intermediário";
    }

    const disciplinasAvancadasSelecionadas = disciplinesSelected.filter(
      (disciplina) => nivelAvancadoDisciplinas.includes(disciplina)
    );

    if (disciplinasAvancadasSelecionadas.length >= 3) {
      nivel = "Avançado";
    }

    return nivel;
  };

  return (
    <div className="image-container">
      <a href="/">
        <img
          src="logoNextDigitalTech.png"
          alt="NextDigital"
          style={{ width: 300 }} />
      </a>
      <h1>Diagnóstico de Efetividade em tecnologia</h1>
      <div className="espacador"></div>
     
      <h2>Escolha as disciplinas que sua empresa implementa abaixo:</h2>
      {/* <div class="paragraph">
          <p>Os elementos em amarelo representam disciplinas de gestão ágil</p>
        </div>
        <div class="paragraph">
          <p> Os elementos na cor pink representam disciplinas da engenharia de software</p>
        </div>
        <div class="paragraph">
          <p style="width: 400px;"> Os elementos na cor azul representam disciplinas da cultura de engenharia de software avançada</p>
        </div>
    */}

      <div className="espacador"></div>
      {/* Gere um layout de imagens em 3 linhas !*/}
      <div className="image-container">
        {/* Primeira Linha */}
        <div className="row">
          <div className={`image ${disciplinesSelected.includes("Sprint") ? "selected" : ""}`}>
            <img
              src="Sprint.png"
              alt="Sprint"
              style={{ width: 100 }}
              onClick={() => handleImageClick("Sprint")}
            />
            <div className="overlay" />
            <div className="image-text">Desenvolvimento em períodos curtos</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Retro") ? "selected" : ""}`}>
            <img src="Retro.png" alt="Retro" style={{ width: 100 }}
              onClick={() => handleImageClick("Retro")}
            />
            <div className="overlay" />
            <div className="image-text">Reflexão após cada sprint</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Epico") ? "selected" : ""}`}>
            <img src="Epico.png" alt="Epico" style={{ width: 100 }}
              onClick={() => handleImageClick("Epico")}
            />
            <div className="overlay" />
            <div className="image-text">Grandes objetivos divididos</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Planning") ? "selected" : ""}`}>
            <img src="Planning.png" alt="Planning" style={{ width: 100 }}
              onClick={() => handleImageClick("Planning")}
            />
            <div className="overlay" />
            <div className="image-text">Definindo metas e prioridades</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("CICD") ? "selected" : ""}`}>
            <img src="CICD.png" alt="CICD" style={{ width: 100 }}
              onClick={() => handleImageClick("CICD")}
            />
            <div className="overlay" />
            <div className="image-text">
              Integração Contínua/Entrega Contínua
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Cloud") ? "selected" : ""}`}>
            <img src="Cloud.png" alt="Cloud" style={{ width: 100 }}
              onClick={() => handleImageClick("Cloud")}
            />
            <div className="overlay" />
            <div className="image-text">
              Armazenamento e processamento de dados online
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("EvoArch") ? "selected" : ""}`}>
            <img src="EvoArch.png" alt="EvoArch" style={{ width: 100 }}
              onClick={() => handleImageClick("EvoArch")}
            />
            <div className="overlay" />
            <div className="image-text">
              (Arquitetura Evolutiva): Arquitetura de software flexível e adaptável
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("InnerSource") ? "selected" : ""}`}>
            <img src="InnerSource.png" alt="InnerSource" style={{ width: 100 }}
              onClick={() => handleImageClick("InnerSource")}
            />
            <div className="overlay" />
            <div className="image-text">
              Práticas de desenvolvimento colaborativo, semelhantes ao Open-Source
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("DX") ? "selected" : ""}`}>
            <img src="DX.png" alt="DX" style={{ width: 100 }}
              onClick={() => handleImageClick("DX")}
            />
            <div className="overlay" />
            <div className="image-text">
              Experiência do Desenvolvedor
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Finops") ? "selected" : ""}`}>
            <img src="Finops.png" alt="Finops" style={{ width: 100 }}
              onClick={() => handleImageClick("Finops")}
            />
            <div className="overlay" />
            <div className="image-text">
              Práticas para gerenciar eficazmente os custos de operações
              de TI
            </div>
          </div>
          <div className="image-space2">
            <img src="NextDigital-4.png" style={{ width: 100 }} />
          </div>
        </div>
        {/* Segunda Linha */}
        <div className="row-two">
          <div className={`image ${disciplinesSelected.includes("Kaban") ? "selected" : ""}`}>
            <img src="Kaban.png" alt="Kaban" style={{ width: 100 }} onClick={() => handleImageClick("Kaban")}
            />
            <div className="overlay" />
            <div className="image-text"> Controle visual do trabalho</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Scrum") ? "selected" : ""}`}>
            <img src="Scrum.png" alt="Scrum" style={{ width: 100 }} onClick={() => handleImageClick("Scrum")} />
            <div className="overlay" />
            <div className="image-text">Colaboração e entregas frequentes</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Features") ? "selected" : ""}`}>
            <img src="Feaures.png" alt="Feaures" style={{ width: 100 }} onClick={() => handleImageClick("Features")} />
            <div className="overlay" />
            <div className="image-text">
              Funcionalidades específicas bem definidas
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Pairing") ? "selected" : ""}`}>
            <img src="Pairing.png" alt="Pairing" style={{ width: 100 }} onClick={() => handleImageClick("Pairing")} />
            <div className="overlay" />
            <div className="image-text">
              Programação em par, duas pessoas colaborando em código
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("TDD") ? "selected" : ""}`}>
            <img src="TDD.png" alt="TDD" style={{ width: 100 }} onClick={() => handleImageClick("TDD")} />
            <div className="overlay" />
            <div className="image-text">
              Desenvolvimento Orientado a Testes
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("DDD") ? "selected" : ""}`}>
            <img src="DDD.png" alt="DDD" style={{ width: 100 }} onClick={() => handleImageClick("DDD")} />
            <div className="overlay" />
            <div className="image-text">
              Design Orientado a Domínio
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("AutomatTests") ? "selected" : ""}`}>
            <img src="AutomatTests.png" alt="AutomatTests" style={{ width: 100 }} onClick={() => handleImageClick("AutomatTests")} />
            <div className="overlay" />
            <div className="image-text">
              Automatização de testes para garantir a qualidade do software
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("DataDriven") ? "selected" : ""}`}>
            <img src="DataDriven.png" alt="DataDriven" style={{ width: 100 }} onClick={() => handleImageClick("DataDriven")} />
            <div className="overlay" />
            <div className="image-text">
              Orientado por Dados: Tomada de decisões baseada em análise de dados
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Platform") ? "selected" : ""}`}>
            <img src="Platform.png" alt="Platform" style={{ width: 100 }} onClick={() => handleImageClick("Platform")} />

            <div className="overlay" />
            <div className="image-text">
              Um ambiente tecnológico para construir e reutilizar artefatos
            </div>
          </div>
          <div className="image-space">
            <img src="NextDigital-4.png" style={{ width: 100 }} />
          </div>
        </div>
        {/* Terceira Linha */}
        <div className="row-three">
          <div className={`image ${disciplinesSelected.includes("Story") ? "selected" : ""}`}>
            <img src="Story.png" alt="Story" style={{ width: 100 }} onClick={() => handleImageClick("Story")} />
            <div className="overlay" />
            <div className="image-text">Unidades de trabalho ágil</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Backlog") ? "selected" : ""}`}>
            <img src="Backlog.png" alt="Backlog" style={{ width: 100 }}
              onClick={() => handleImageClick("Backlog")}
            />
            <div className="overlay" />
            <div className="image-text">Lista de tarefas priorizadas</div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Solid") ? "selected" : ""}`}>
            <img src="Solid.png" alt="Solid" style={{ width: 100 }}
              onClick={() => handleImageClick("Solid")}
            />
            <div className="overlay" />
            <div className="image-text">
              Princípios de design de software para código limpo e escalável
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("CleanArch") ? "selected" : ""}`}>
            <img src="CleanArch.png" alt="CleanArch" style={{ width: 100 }}
              onClick={() => handleImageClick("CleanArch")}
            />
            <div className="overlay" />
            <div className="image-text">
              {" "}
              Estruturar código de forma organizada e testável
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("Git") ? "selected" : ""}`}>
            <img src="Git.png" alt="Git" style={{ width: 100 }}
              onClick={() => handleImageClick("Git")}
            />
            <div className="overlay" />
            <div className="image-text">
              Sistema de controle de versão para colaboração no desenvolvimento
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("DevOps") ? "selected" : ""}`}>
            <img src="DevOps.png" alt="DevOps" style={{ width: 100 }}
              onClick={() => handleImageClick("DevOps")}
            />
            <div className="overlay" />
            <div className="image-text">
              Cultura de colaboração entre desenvolvimento e operações
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("ArchAsProduct") ? "selected" : ""}`}>
            <img src="ArchAsProd.png" alt="ArchAsProduct" style={{ width: 100 }}
              onClick={() => handleImageClick("ArchAsProduct")}
            />
            <div className="overlay" />
            <div className="image-text">
              Abordagem que trata a arquitetura de software como um produto valioso
            </div>
          </div>
          <div className={`image ${disciplinesSelected.includes("DataAsProduct") ? "selected" : ""}`}>
            <img
              src="DataAsProduct.png"
              alt="DataAsProduct"
              style={{ width: 100 }} onClick={() => handleImageClick("DataAsProduct")}
            />
            <div className="overlay" />
            <div className="image-text">
              Tratar dados como um recurso valioso para a empresa
            </div>
          </div>
          <div className="image-space3">
            <img src="NextDigital-4.png" style={{ width: 100 }} />
          </div>
        </div>
      </div>
      <button id="diagnosticar-button" className="highlight-button"
        onClick={handleDiagnosticarClick}>
        Diagnosticar
      </button>
      <div className="container" style={{ marginBottom: showResult ? '20px' : '0' }}> </div>
      <div id="resultado" className={showResult ? "espacador" : "hidden"}>
        <div id="diagnostico-texto" className="espacador" style={{ marginBottom: showResult ? '20px' : '0' }}>
          {nivel === "Iniciante" && (
            <div>
              Sua empresa está no nível Iniciante. Considere implementar mais
              disciplinas para progredir para níveis superiores.
            </div>
          )}
          {nivel === "Básico" && (
            <div style={{ marginBottom: showResult ? '20px' : '0' }}>
              Sua empresa possui elementos de <strong>Gestão Ágil</strong>. Os
              benefícios atuais incluem:
              <ul>
                <li>
                  Maior Eficiência: Implementar práticas como Sprint, Retro e
                  Scrum ajuda a melhorar a eficiência das equipes de
                  desenvolvimento.
                </li>
                <li>
                  Melhor Comunicação: O uso de Backlog e Story auxilia na
                  comunicação e colaboração entre equipes e partes interessadas.
                </li>
                <li>
                  Maior Visibilidade: Disciplinas como Features e Planning
                  oferecem maior visibilidade dos projetos em andamento.
                </li>
              </ul>
            </div>
          )}
          {nivel === "Intermediário" && (
            <div>
              Sua empresa alcançou práticas de <strong>Engenharia de Software</strong>. Os
              benefícios atuais incluem:
              <ul>
                <li>
                  Qualidade Aprimorada: A implementação de TDD e DDD melhora a
                  qualidade do código e do design de software.
                </li>
                <li>
                  Automatização: Práticas como CI/CD e Automated Tests aumentam
                  a automação de processos, economizando tempo e reduzindo
                  erros humanos.
                </li>
                <li>
                  Capacidade de Inovação: Com Cloud e Evolutionary Architecture,
                  a empresa tem a capacidade de inovar mais rapidamente e
                  escalar recursos conforme necessário.
                </li>
              </ul>
            </div>
          )}
          {nivel === "Avançado" && (
            <div className="espacador">
              Parabéns! Sua empresa está no nível Avançado. Os benefícios atuais
              incluem:
              <ul>
                <li>
                  Inovação Contínua: A área de Tecnologia participa da inovação
                  junto com as áreas de negócio.
                </li>
                <li>
                  Eficiência Máxima: Com práticas como DataDriven e
                  Architecture As Product, a empresa atinge uma eficiência
                  máxima em todos os aspectos do desenvolvimento de software.
                </li>
                <li>
                  Tomada de Decisão Informada: DataDriven fornece insights
                  valiosos para tomada de decisões informadas e melhoria
                  contínua.
                </li>
                <li>
                  Vantagem Competitiva: Empresas no nível avançado têm uma
                  vantagem competitiva sustentável e podem se adaptar
                  rapidamente a novos desafios.
                </li>
              </ul>
              <p className="espacador">
                Sua empresa está na vanguarda da inovação e da eficiência no
                desenvolvimento de software. Continue aprimorando suas práticas
                para manter essa posição.
              </p>
            </div>

          )
          }
        </div>
      </div>
      <div className="espacador"></div>
      <div className="espacador"></div>
      <div className="espacador"></div>
      <div className="espacador"></div>


      <h3>
        Gostaria de receber o diagnóstico por email com alguns insights
        adicionais? Preencha os dados abaixo ou apenas envie sugestões e feedback!
      </h3>



      <form id="contato-form" className="espacador" onSubmit={createTodo}>

        <label htmlFor="nome">Nome:*</label>
        <input type="text" id="nome" name="nome" required />
        <br />
        <br />
        <label htmlFor="email">Email*:</label>
        <input type="email" id="email" name="email" style={{ width: "300px" }} required />
        <br />
        <br />
        <label htmlFor="mensagem">
          Sugestões - ex: Gostaria de ver algum elemento?/Feedback:
        </label>
        <br />
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          cols={80}
          defaultValue={""} />
        <br />
        <br />
        <input type="checkbox" id="agree-checkbox" required />
        <label htmlFor="agree-checkbox">
          Eu concordo com os termos e condições*
        </label>
        <br />
        <a id="terms-link" href="#" onClick={openModal}>
          Termos e Condições
        </a>
        <div>
          Preencha todo os campos com *(obrigatórios)
          <br />e depois click em Enviar
        </div>
        <button
          type="submit"
          className="highlight-button"
          id="submit-button"
          disabled=""
        >
          Enviar
        </button>
        <div className="espacador"></div>
        <div className="espacador"></div>
        <div className="espacador"></div>

      </form>

      <div className={`modal ${modalVisible ? "show" : "modal-content"}`}>
        <div className="modal-content">
          <h2>Termos e Condições</h2>
          Ao concordar com esses termos, você permite que a NextDigital Tech
          utilize os dados fornecidos apenas para entrar em contato com você ou
          sua empresa com seu consentimento. Os dados não serão utilizados para
          nenhum outro fim.
          <p>
            Se você tiver alguma dúvida ou preocupação, entre em contato conosco: contato@nextdigitaltech.com.br
          </p>
          <input type="checkbox" id="agree-terms-checkbox" />
          <label htmlFor="agree-terms-checkbox" >
            Eu concordo com os termos e condições.
          </label>
          <button onClick={closeModal} id="accept-terms-button">
            OK
          </button>
        </div>
      </div>

    </div>
  );


};
//export default withAuthenticator(App);
export default App;