<template>
	<div id="itemGroups">
		<div class="container">
			<div class="addgroup">
				<div class="banzu">
					<div>
						一级班组：
					</div>
					<el-input v-model="input" class="widthdian" placeholder="选择一级班组"></el-input>
					<div class="center_add">
						添加一级班组
					</div>
				</div>
				<div class="banzu">
					<div>
						二级班组名称：
					</div>
					<el-input v-model="input" class="widthdian" placeholder="填写班组名称"></el-input>
				</div>
				<div class="banzu">
					<div>
						选择收入模式：
					</div>
					<el-input v-model="input" class="widthdian" placeholder="填写班组名称"></el-input>
				</div>
			</div>
			<div class="numberPrice">
				<div class="danjia">
					<span>
						接单价：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						放单价：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						日工资：
					</span>
					<el-input-number v-model="num2" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						核定日工资：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						请假单价：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						超时工资：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价1：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=10件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价2：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=20件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价3：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=30件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价4：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=40件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						全勤奖：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						全勤天数：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						餐补：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<el-button type="primary" @click="addBtn" class="addlast">添加</el-button>
					<el-button type="danger" id="nomargin" @click="cancelBtn" class="addlast">取消</el-button>
				</div>				
			</div>			
		</div>
	</div>
</template>

<script>
	import util from '../../../common/util';
	export default {
		name: "itemGroups",
		data() {
			return {
				input: "",
				num1: "1",
				num2: "1",
			};
		},
		methods: {
			addBtn(){
				console.log("添加成功！");
			},
			cancelBtn(){
				this.$router.push({
					name: 'adminItemShow',
					params: {
						id: this.$route.params.id
					}
				});
			},
			handleChange(value) {
				console.log(value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	#itemGroups {
		width: 100%;
		height: 100%;
		.container {
			width: 1000px;
			height: 100%;
			margin-left: 100px;
			.addgroup {
				width: 100%;
				height: 200px;
				.banzu {
					width: 100%;
					height: 40px;
					padding: 10px 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.widthdian {
						width: 550px;
						height: 100%;
					}
					div {
						width: 160px;
						height: 100%;
						color: dodgerblue;
						text-align: right;
						line-height: 40px;
						margin-right: 20px;
					}
					div:nth-of-type(1) {
						color: black;
					}
					.center_add {
						text-align: center;
						cursor: pointer;
					}
				}
			}
			.numberPrice {
				width: 100%;
				height: 100%;
				.danjia {
					width: 100%;
					height: 40px;
					padding: 14px 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					#nomargin{
						margin-left: 100px;
					}
					.addlast{
						width: 180px;
						margin-left: 180px;
					}
					span {
						width: 160px;
						height: 100%;
						text-align: right;
						line-height: 40px;
						margin-right: 20px;
					}
					span:nth-of-type(2){
						width: 200px;
					}
				}
			}
		}
	}
</style>