import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router';

export default function Error404(){
    const roteamento=useRouter();
    const error='https://vignette.wikia.nocookie.net/fategrandorder/images/1/1d/Error404.png/revision/latest?cb=20170204102207';
    return(
    <>
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                backgroundColor: appConfig.theme.colors.neutrals['000'],
                backgroundImage: `url(${error})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
        >
            <Button
                label='No Way Home'
                onClick={(event)=>{
                    event.preventDefault();
                    roteamento.push("/")

                }}
                styleSheet={{
                    borderRadius:'10px',
                    left:'380px',
                    top:'200px',
                    padding: '15px 32px',
                    textAlign:'center'

                }}
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals['000'],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary['600'],

                }}
            
            >
            </Button>
        </Box> 
    </>
       
    )
}