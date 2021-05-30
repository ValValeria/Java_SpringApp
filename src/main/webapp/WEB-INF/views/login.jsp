<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!doctype html>
<html>
<head>
    <title>Web Design - Login</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="/public/css/auth.css"/>
</head>

<%
   String error = request.getParameter("error");
   String inputError = request.getParameter("inputError");
%>
<body class="center">
<div class="login center">
    <div class="login__container">
        <h2 class="login__title text-center mb-1">Login</h2>
        <form:form method="post"  action="/auth/authenticate" modelAttribute="user">
            <div class="login__input form-group">
                <label>Username</label>
                <form:input path="username"/>
            </div>
            <div class="login__input form-group">
                <label>Password</label>
                <form:input path="password"/>
            </div>
            <%if (inputError != null){
                String username = request.getParameter("username");
                String password = request.getParameter("password");
            %>
            <div class="login__errors-list w-100 form-group mt-2">
                <% if(username != null){%>
                <div class="alert alert-danger w-100" role="alert">
                    Please, check the validity of username
                </div>
                <%}else if(password != null){%>
                <div class="alert alert-danger w-100" role="alert">
                    Please, check the validity of password
                </div>
                <%} else{%>
                <div class="alert alert-danger w-100" role="alert">
                    Please, check the validity of fields
                </div>
                <%}%>
            </div>
            <%} else if(error != null){%>
            <div class="login__errors-list w-100 form-group mt-2">
                <div class="alert alert-danger w-100" role="alert">
                    It seems that you are not the admin
                </div>
            </div>
            <%}%>
            <div class="login__btn w-100 center">
                <button class="btn" id="button">Submit</button>
            </div>
        </form:form>
    </div>
</div>

<script>
    const inputs = Array.from(document.querySelectorAll("input"));

    const [,passInput] = inputs;

    inputs.forEach(v=>{
        v.setAttribute("maxLength", 30);
        v.setAttribute("minLength", 10);
        v.setAttribute("required", true);
    });

    passInput.setAttribute("type", "password");

    document.querySelector("#button").addEventListener("click", function submit($event){
        $event.preventDefault();
        $event.stopPropagation();

        const form = document.querySelector("form");
        const input = Array.from(form.querySelectorAll("input"));
        const obj = {};

        input.forEach(v=>{
            obj[v.name] = v.value;
        });

        localStorage.setItem("user", JSON.stringify(obj));

        form.submit();
    });
</script>

</body>
</html>
