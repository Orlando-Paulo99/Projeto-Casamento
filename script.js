


const supabaseUrl = 'https://siisfqsolecihnnhscro.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpaXNmcXNvbGVjaWhubmhzY3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODk4NTgsImV4cCI6MjA3OTc2NTg1OH0.c0jbGMouyut02lnLUiEorUlNDci81jsRp4Sh78d9Dfs'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


//Colocando entre pareteses o nome evento para realizar a ação do evento
async function foto(event){

    //variaveis dos campos que irão ser mencionados
    let newF=document.getElementById("addImg")
    let showFoto=document.getElementById("newIMG")

    //realiza o evento e pega a o ultima imagem inserida
    //e também é a variavel do evento de quando o usuario insere a imagem
    const fotu=event.target.files[0]

    //faz com que a foto não seja inserida com o mesmo nome 
    //o data.now é para que seja apresentada data e hora em segundos 
    const fileName = `${Date.now()}-${fotu.name}`;

    const {data,error} =await supabase
    .storage
    .from('ff')
    .upload(`nova/${fileName}`,fotu)

    console.log(error)
}


async function visualizarF() {

    let showFoto=document.getElementById("newIMG")

    const { data,error } = await supabase
    .storage
    .from('ff')
    .list('nova')
    
    if(error){
        console.log(error)
        return
    }
    
    data.forEach(file => {
        const {data:publicData}= supabase
        .storage
        .from('ff')
        .getPublicUrl(`nova/${file.name}`)

        const url=publicData.publicUrl

        console.log(url)

        const foto= document.createElement("img")
        foto.src=url
        foto.width=60;

        showFoto.appendChild(foto)
 
    });
    
}

visualizarF()
