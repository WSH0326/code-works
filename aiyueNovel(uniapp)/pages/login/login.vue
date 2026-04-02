<template>
	<view class="container">
		<view style="height: 80rpx;"></view>
		
		<van-cell-group inset>
			<van-field :value="formData.mobile" :error-message="checkData.mobile" label="手机号" placeholder="请输入手机号"
				@input="onInputChange" data-field="mobile" clearable />
			<van-field :value="formData.password" type="password" :error-message="checkData.password" label="密码"
				placeholder="请输入密码" @input="onInputChange" data-field="password" clearable />
		</van-cell-group>
		
		<view style="margin: 30rpx 25rpx; display: flex; align-items: center;">
			<van-checkbox v-model="checked" shape="square" @change="onBoxChange">
				下次自动登录
			</van-checkbox>
		</view>
		
		<view class="button-group" style="margin: 40rpx 25rpx;">
			<van-button type="primary" round block @click="onSubmit" style="margin-bottom: 20rpx;">
				登录
			</van-button>
		
			<van-button plain type="default" round block>
				注册
			</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
				formData: {
					mobile: '',
					password: ''
				},
				checkData: {
					mobile: '',
					password: ''
				},
				rules: {
					mobile: {
						required: true,
						tel: true
					},
					password: {
						required: true,
						minlength: 6
					},
				},
				message: {
					mobile: {
						required: '请填写手机号码',
						tel: '请输入有效的手机号码'
					},
					password: {
						required: '请填写密码',
						minlength: "密码不能少于6位"
					}
				}
			}
		},
		methods: {
			onInputChange(e) {
				let field = e.currentTarget.dataset.field
				this.formData[field] = e.detail
				this.checkData[field] = ''
			},

			onBoxChange(event) {
				this.checked = event.detail
			},

			onSubmit() {
				const { rules, message, formData } = this
				let valid = true
				let errors = {}

				if (!formData.mobile) {
					valid = false
					errors.mobile = message.mobile.required
				} else if (!/^1[3-9]\d{9}$/.test(formData.mobile)) {
					valid = false
					errors.mobile = message.mobile.tel
				}

				if (!formData.password) {
					valid = false
					errors.password = message.password.required
				} else if (formData.password.length < 6) {
					valid = false
					errors.password = message.password.minlength
				}

				if (!valid) {
					this.checkData = errors
					return
				}

				this.doLogin()
			},

			doLogin() {
				uni.showToast({
					title: "登录成功",
					icon: "success"
				});

				uni.setStorageSync("token", "mock_token_123456");

				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/index/index"
					});
				}, 1000);
			},
		}
	}
</script>

<style>
	.button-group {
		margin-top: 30px;
		display: flex;
		justify-content: space-around;
	}
</style>