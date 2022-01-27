import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SupaBase_Anon_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNDI3OCwiZXhwIjoxOTU4ODkwMjc4fQ.GBtwkxlZj3_a3PsLS5XaZP9xSM5R_9lP98SNjegpexY";
const SupaBase_url="https://jpcflmjsxjijjavnzyom.supabase.co";

const SupaBaseClient=createClient(SupaBase_url,SupaBase_Anon_key)



export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const chainsaw='https://i.redd.it/8v1olnnsbxo51.jpg';

    React.useEffect(()=>{
        const dataSupaBase=SupaBaseClient
        .from('Mensagens')
        .select('*')
        .then(async({data})=>{
            await console.log("Dados da consulta",data);
            setListaDeMensagens(data);

    });

    },[]);

    function handleNovaMensagem(novaMensagem) {
        console.log("Teste");
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: 'NitroCaffeine',
            texto: novaMensagem,
        };

        SupaBaseClient
            .from('Mensagens')
            .insert([mensagem])
            .order('id',{ascending:false})
            .then(({data})=>{
                //console.log(response);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ])
                
            });


        //setListaDeMensagens([
        //    mensagem,
        //    ...listaDeMensagens,
        //]);
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals['000'],
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    //variant='tertiary'
                    //colorVariant='neutral'
                    label='Logout'
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['000'],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary['600'],
                      }}
                    //href="/"
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
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}
