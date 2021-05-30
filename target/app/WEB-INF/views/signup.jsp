<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!doctype html>
<html>
<head>
    <title>Web Design - Signup</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/public/css/auth.css"/>
</head>
<body>
<div class="signup center">
    <div class="signup__container">
        <h3>Sign up</h3>
        <form:form method="post" action="/signup" modelAttribute="user">
            <div class="signup__input form-group">
                <form:label path="username"> Username</form:label>
                <form:input path="username" cssClass="form-control"/>

                <div class="signup__input-errors">
                    <form:errors path="username"/>
                </div>
            </div>

            <div class="signup__input form-group">
                <form:label path="email"> Email</form:label>
                <form:input path="email" cssClass="form-control"/>

                <div class="signup__input-errors">
                    <form:errors path="email"/>
                </div>
            </div>

            <div class="signup__input form-group">
                <form:label path="username"> Password</form:label>
                <form:input path="password"/>

                <div class="signup__errors">
                    <form:errors path="password"/>
                </div>
            </div>

            <div class="signup__btn">
                <button class="btn btn-dark">Submit</button>
            </div>
        </form:form>
    </div>
</div>
</body>
</html>
