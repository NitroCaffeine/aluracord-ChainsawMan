import {Box,Button,Text,TextField,Image} from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';



function Titulo(props){
    console.log(props.children);
    const Tag=props.tag || "h1";
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color:${appConfig.theme.colors.neutrals['000']};
                    font-size:24px;
                    font-weight:600;
                }

            `}</style>
        </>

    );
}

//function HomePage() {
//    return (
//    <div>
//        <GlobalStyle/>
//        <Title tag="h2">Boas vindas de volta!</Title>
//        <h2> Discord-Alura Matrix</h2>
//    </div>
//    );
//}
  
//export default HomePage

export default function PaginaInicial() {
  const [username,setUsername]=React.useState('');
  const roteamento=useRouter();
  const chainsaw_gif='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fart.ngfiles.com%2Fimages%2F1313000%2F1313953_eltrainanim_revvin-up-chainsaw-man.gif%3Ff1592225446&f=1&nofb=1';

  
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals['700-1'],
          backgroundImage: `url(${chainsaw_gif})`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '30px', padding: '20px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            boxShadow: '10px 05px 40px 10px #7CF292',

          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={ function (event) {
              event.preventDefault();
              console.log('Houve uma submissão');
              if (username.length <= 2) {
                roteamento.push(`/404`);
              }else{
                roteamento.push(`/chat?username=${username}`);

            }}}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '20px'
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ fontFamily:'Sans-serif', marginBottom: '32px', color: appConfig.theme.colors.neutrals[200]}}>
              {appConfig.name} ({username})
            </Text>


            <TextField
              value={username}
              autoComplete='off'
              onChange={function handler(event){
                console.log('usuário digitou',event.target.value)
                //trocar o valor da variável
                const valor=event.target.value;
                //setMaxListeners(40);
                setUsername(valor);

              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
           </Box>
          
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
          
                src={username.length > 2 && `https://github.com/${username}.png` || `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0353%2F8839%2F1563%2Fproducts%2F2158591-1_1024x1024%402x.jpg%3Fv%3D1619074086&f=1&nofb=1` }
            />
            <Text
              variant="body4"
              styleSheet={{
                fontFamily:'Monospace',
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[800],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
