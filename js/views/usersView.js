import usersController from '../controllers/usersController.js'
import doctorsController from '../controllers/doctorsController.js'
import appointmentsController from '../controllers/appointmentsController.js'

export default class usersView {
    constructor() {
        this.usersController = new usersController();
        this.doctorsController = new doctorsController();
        this.appointmentsController = new appointmentsController();
        this.gamificationController = new appointmentsController();

        $("#loginBtt").click(() => {
            this.login()
        })

        $("#registerBtt").click(() => {
            this.register()
        })
    }

    login() {
        let username = document.getElementById("loginUsername").value
        let password = document.getElementById("loginPassword").value

        let status = this.usersController.checkUser(username)
        if (!status) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User not found!',
                footer: '<a href="register.html">Do you have an account?</a>'
            })
        } else {
            status = this.usersController.checkPassword(username, password)
            if (!status) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong Password!',
                    footer: '<a href="#">Forgot your password?</a>'
                })
            } else {
                sessionStorage.loggedUser = JSON.stringify(this.usersController.getUser(username))
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Hello ' + username + '!',
                    timer: 2000
                }).then(() => {
                    location.href = "../index.html";
                })
            }
        }
    }

    register() {
        //SAVES FIELDS INFO
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;
        let diseases = document.getElementById("diseases").value;
        let pills = document.getElementById("pills").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("pass").value;
        let cpass = document.getElementById("cpass").value;

        //CHECK NON REQUIRED FIELDS
        if (diseases == "") {
            diseases = "NA";
        }
        if (pills == "") {
            pills = "NA";
        }

        //SAVE ITEMS IN OBJECT
        let items = {
            fname: fname,
            lname: lname,
            phone: phone,
            address: address,
            email: email,
            diseases: diseases,
            pills: pills,
            username: username,
            password: password,
            cpass: cpass
        }

        //VALIDATES ALL THE FIELDS
        let validate = true;
        for (let item of Object.keys(items)) {
            if (items[item] == "") {
                validate = false
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please fill all the fields!"
                })
                break;
            }
        }

        if (validate) {
            if (password != cpass) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Passwords don't match!"
                })
            } else {
                if (this.usersController.checkUsername(username))  {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username already exists!'
                    })
                } else {
                    this.usersController.createUser(items);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Welcome ' + username + " to Medify!",
                        timer: 2000
                    }).then(() => {
                        location.href = "login.html";
                    })
                }
            }
        }

    }
}