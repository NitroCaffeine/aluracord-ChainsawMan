import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js';
import {ButtonSendSticker} from '../src/components/ButtonSendSticker';

const SupaBase_Anon_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNDI3OCwiZXhwIjoxOTU4ODkwMjc4fQ.GBtwkxlZj3_a3PsLS5XaZP9xSM5R_9lP98SNjegpexY";
const SupaBase_url="https://jpcflmjsxjijjavnzyom.supabase.co";

const SupaBaseClient=createClient(SupaBase_url,SupaBase_Anon_key)

function ListennerMessageRealTime(addMessage){
    return SupaBaseClient
    .from("Mensagens")
    .on('INSERT', (response)=>{
        addMessage(response.new);

    }).subscribe();
}

export default function ChatPage() {
    const roteamento=useRouter();
    const userLogged=roteamento.query.username;
    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const chainsaw='https://i.redd.it/8v1olnnsbxo51.jpg';


    React.useEffect(()=>{
        SupaBaseClient
        .from('Mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(async({data})=>{
            await console.log("Dados da consulta",data);
            setListaDeMensagens(data);
    
    });

    const subscription = ListennerMessageRealTime((novaMensagem) => {
        console.log('Nova mensagem:', novaMensagem);
        console.log('listaDeMensagens:', listaDeMensagens);
       
        setListaDeMensagens((valorAtualDaLista) => {
          console.log('valorAtualDaLista:', valorAtualDaLista);
          return [
            novaMensagem,
            ...valorAtualDaLista,
          ]
        });
      });
  
      return () => {
        subscription.unsubscribe();
      }
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: userLogged,
            texto: novaMensagem,
        };

        SupaBaseClient
            .from('Mensagens')
            .insert([mensagem])
            .then(({data})=>{
                console.log("Criando mensagem",data);
                
            });

        setMensagem("");
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals['700'],
                backgroundImage: `url(${chainsaw})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    boxShadow: '10px 05px 40px 10px #7CF292',
                    borderRadius: '20px',
                    backgroundColor: appConfig.theme.colors.neutrals['700-1'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals['700-1'],
                        flexDirection: 'column',
                        //boxShadow: '10px 05px 40px 10px #7CF292',
                        borderRadius: '10px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            //boxShadow: '10px 10px 40px 10px #7CF292',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '10px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginBottom:'1px',
                                //marginRight: '1px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                        onStickerClick={(sticker)=>{
                            //console.log('Salva esse sticker');
                            handleNovaMensagem(":sticker:" + sticker);

                        }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


function Header() {
    const roteamento=useRouter();
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    label='Logout'
                    onClick={(event)=>{
                        event.preventDefault();
                        roteamento.push("/");

                    }}
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['000'],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary['600'],
                      }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals['800']
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong"
                                
                             >   
                             {mensagem.de}
                            </Text>
                            
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    marginTop:'2px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(":sticker:")
                        ? (<Image src={mensagem.texto.replace(":sticker:", "")}
                                styleSheet={{
                                    maxWidth: "20%",
                                }} 
                            />
                        )
                        : (
                            mensagem.texto
                        )}
                       
                    </Text>
                );
            })}
        </Box>
    )
}
