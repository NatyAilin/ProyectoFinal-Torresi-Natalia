let dBusuarios = [
    {
        id: 1,
        user: "Natalia",
        pass: 123456,
        admin: true,
    },
];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(dBusuarios));


//traemos el formulario
const btnRegister = document.getElementById("btn__register");
const formRegister = document.getElementById("user__register");
const formLogin = document.getElementById("user__login");
const btnLogin = document.getElementById("btn__logearse");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

class newUser{
    constructor(user, pass){
        this.id = usuarios.length + 1,
        this.user = user,
        this.pass = pass,
        this.admin = false
    };
};

btnLogin.addEventListener("click", (e) => {
    e.preventDefault()
    
    //conseguir informacion del formuario
    const user = formLogin.children[0].children[1].value;
    const pass = formLogin.children[1].children[1].value;

    validarYlogear(user, pass);
});

const validarYlogear = (user, pass) => {
    const userExiste = usuarios.find((usuario) => usuario?.user === user);

    if(userExiste === undefined || userExiste.pass != pass){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hay un error en la contraseña o el usuario',
            showConfirmButton: true, 
        })
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Bienvenido ${user}`,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('El usuario hizo clic en el botón de confirmación');
            }

        let usuario = {
            user: userExiste.user,
            pass: userExiste.pass,
            admin: userExiste.admin
        };

        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        location.href = "../index.html"
        });
    }
};

btnRegister.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formRegister.children[0].children[1].value;
    const pass = formRegister.children[1].children[1].value;

    const nuevoUsuario = new newUser(user, pass);

    validarYRegistrar(nuevoUsuario);    
});


const validarYRegistrar = (nuevoUsuario) => {

    const userNuevo = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user);

    if(userNuevo === undefined){
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        
        Swal.fire({
            title: `Muchas gracias ${nuevoUsuario.user} por registrarse en Jugueterias Nemo`,
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
            }
        })
        setTimeout(() => {
            console.log(usuarios);
        location.href ="../index.html"
        }, 5000);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario ya existe',
            footer: 'Intente con un nuevo nombre</a>',
            timer: 5000, 
            onClose: () => {
                sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
        location.href ="../index.html"
            }
        });
    };
};



