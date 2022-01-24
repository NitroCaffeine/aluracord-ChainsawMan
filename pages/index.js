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
                    backgroundColor:${appConfig.theme.colors.neutrals['700']};;
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
  const [username,setUsername]=React.useState('NitroCaffeine');
  const roteamento=useRouter();
  
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals['000'],
          backgroundImage: 'url(https://wallpapercave.com/dwp1x/wp4518879.jpg)',
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
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={ function (event) {
              event.preventDefault();
              console.log('Houve uma submissão');
              roteamento.push('/chat')

            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '20px', backgroundColor:appConfig.theme.colors.neutrals[700]
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ fontFamily:'Sans-serif', marginBottom: '32px', color: appConfig.theme.colors.neutrals[300], backgroundColor:appConfig.theme.colors.neutrals[700],}}>
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
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                fontFamily:'Monospace',
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
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