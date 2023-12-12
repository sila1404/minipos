<template>
    <div class="d-flex justify-content-center">
        <div
            class="authentication-wrapper authentication-basic container-p-y col-md-4"
        >
            <div class="authentication-inner">
                <!-- Register -->
                <div class="card">
                    <div class="card-body">
                        <!-- Logo -->
                        <div class="app-brand justify-content-center"></div>
                        <!-- /Logo -->
                        <h4 class="mb-2">ສະບາຍດີ! 👋</h4>
                        <p class="mb-4">ຍິນດີຕ້ອນຮັບ ກະລຸນາເຂົ້າສູ່ລະບົບ</p>

                        <div class="mb-3">
                            <label for="email" class="form-label"
                                >ອີເມວລ໌:</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="email"
                                name="email-username"
                                placeholder="..."
                                autofocus=""
                                fdprocessedid="mamqh"
                                v-model="email"
                            />
                        </div>
                        <div class="mb-3 form-password-toggle">
                            <div class="d-flex justify-content-between">
                                <label class="form-label" for="password"
                                    >ລະຫັດຜ່ານ:</label
                                >
                            </div>
                            <div class="input-group input-group-merge">
                                <input
                                    :type="show_pass"
                                    id="password"
                                    class="form-control"
                                    name="password"
                                    placeholder="············"
                                    aria-describedby="password"
                                    fdprocessedid="7afvw4"
                                    v-model="password"
                                />
                                <span
                                    class="input-group-text cursor-pointer"
                                    @click="
                                        show_pass == 'password'
                                            ? (show_pass = 'text')
                                            : (show_pass = 'password')
                                    "
                                >
                                    <i
                                        class="bx bx-hide"
                                        v-if="show_pass == 'password'"
                                    ></i>
                                    <i
                                        class="bx bx-show"
                                        v-if="show_pass == 'text'"
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <div
                            class="alert alert-warning"
                            role="alert"
                            v-if="text_error || check_email || check_pass"
                        >
                            {{ text_error }} {{ check_email }} {{ check_pass }}
                        </div>

                        <div class="mb-3">
                            <button
                                class="btn btn-primary d-grid w-100"
                                type="submit"
                                fdprocessedid="41vnbh"
                                :disabled="check_bt"
                                @click="Login()"
                            >
                                ເຂົ້າສູ່ລະບົບ
                            </button>
                        </div>

                        <p class="text-center">
                            <span>ບໍ່ມີບັນຊີ?</span>
                            <router-link to="/register">
                                <span>ສ້າງບັນຊີໃໝ່</span>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
            <!-- /Register -->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Minipos13Login",

    data() {
        return {
            email: "",
            password: "",
            text_error: "",
            check_email: "",
            check_pass: "",
            show_pass: "password",
        };
    },

    mounted() {},
    computed: {
        check_bt() {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (this.email) {
                if (!emailRegex.test(this.email)) {
                    this.check_email = "ອີເມວລ໌ບໍ່ຖືກຕ້ອງ";
                } else {
                    this.check_email = "";
                }
            }

            if (this.password) {
                if (this.password.length < 5) {
                    this.check_pass = "ລະຫັດຜ່ານຕ້ອງຫລາຍກວ່າ 5 ຕົວອົກສອນ";
                } else {
                    this.check_pass = "";
                }
            }

            if (!emailRegex.test(this.email) || this.password.length < 5) {
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {
        Login() {
            if (this.email != "" && this.password != "") {
                axios
                    .post("api/login", {
                        login_email: this.email,
                        login_password: this.password,
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.data.success) {
                            this.email = "";
                            this.password = "";
                            this.check_email = "";
                            this.check_pass = "";
                            this.text_error = "";

                            localStorage.setItem("web_token", res.data.token);
                            localStorage.setItem(
                                "web_user",
                                JSON.stringify(res.data.user)
                            );

                            this.$router.push("/");
                        } else {
                            this.text_error = res.data.message;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
