<template>
	<div id="adminUserEdit">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">提交名单</div>
			</el-col>
		</el-row>
		<div id="change_container">
			<div class="container"> 
				<div class="baohan">
					<div class="baohan_left">
						<img class="image" :src="editPeop.idCardPositive">
					</div>
					<div class="baohan_right">
						<span class="mar_30" prop="name">
							姓名：
							<el-input class="minzu"  v-model="editPeop.name" placeholder="请输入姓名"></el-input>
						</span>
						<span>
							{{ editPeop.idCard }}
						</span>

						<span class="sex">
							性别：&nbsp;
							&nbsp;&nbsp;&nbsp;
							 <input type="radio" name="1" checked="checked"/>男

							 <input type="radio" name="1" />女
						</span>
						<span prop="nation"> 
							名族：
							<el-input class="minzu"  v-model="editPeop.nation" placeholder="请输入民族"></el-input>
						</span>

						<span>
							生日：
							<el-input class="minzu"  v-model="editPeop.birthday" placeholder="出生日期"></el-input>
						</span>
						<span>
							地址：
							<el-input class="minzu"  v-model="editPeop.address" placeholder="地址"></el-input>
						</span>
					</div>
				</div>
				<div id="rulesBack">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark scend">基本信息:</div>
						</el-col>
					</el-row>
					<el-input  class="boedeyell" label='学历（必填）:' prop="educational" v-model="editPeop.education" :on-icon-click="handleIconClick">

					</el-input>
					<el-input placeholder="婚否（必填）:" class="boedeyell" prop="married" v-model="editPeop.marriage" :on-icon-click="handleIconClick">

					</el-input>
					<el-input placeholder="健康状况（必填）:" class="boedeyell" v-model="editPeop.healthy" :on-icon-click="handleIconClick">

					</el-input>
					<el-input placeholder="常住地址（必填）:" class="boedeyell" v-model="editPeop.address">

					</el-input>
					<el-input placeholder="常用名（选填）:" class="boedeyell" v-model="editPeop.nickname">

					</el-input>
					<el-input placeholder="身高（选填）:" class="boedeyell" v-model="editPeop.height">

					</el-input>
					<el-input placeholder="体重（选填）:" class="boedeyell" v-model="editPeop.nickname">

					</el-input>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark third">主要家庭成员（必填一项）:</div>
						</el-col>
					</el-row>
				<div id="creatExpress"  v-for="item in editPeop.listFamilyMembers">
					<el-input placeholder="姓名:" class="boedeyell" v-model="item.relativesName">

					</el-input>
					<el-input placeholder="关系:" class="boedeyell" v-model="item.relationship">

					</el-input>
					<el-input placeholder="联系方式:" class="boedeyell" v-model="item.relativesPhone">

					</el-input>
					<div id="fengeline">
						------------------------------------------------------------------------------------------------------------------------------------
					</div>
				</div>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark third">工作经历（选填）:</div>
						</el-col>
					</el-row>
				<div id="creatExpress"  v-for="item in editPeop.listWorkExperience">
					<el-input placeholder="工作单位:" class="boedeyell" v-model="item.company">

					</el-input>
					<el-input placeholder="职务:" class="boedeyell" v-model="item.job">

					</el-input>
					<el-input placeholder="离职原因:" class="boedeyell" v-model="item.leaveReason">

					</el-input>
					<div class="block">
						<el-date-picker v-model="item.startTime" class="boedeyell" align="right" type="date" placeholder="入职日期" :picker-options="pickerOptions1">
							
						</el-date-picker>
					</div>
					<div class="block">
						<el-date-picker class="boedeyell" v-model="item.endTime" type="date" placeholder="离职日期" :picker-options="pickerOptions0">
						</el-date-picker>
					</div>
					<el-input placeholder="证明人:" class="boedeyell" v-model="item.witness">

					</el-input>
					<el-input id="boedeyell" placeholder="证明人电话:" class="boedeyell" v-model="item.witnessPhone">

					</el-input>
					<div id="fengeline">
						------------------------------------------------------------------------------------------------------------------------------------
					</div>
				</div>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple four el-icon-plus"  @click="addExpression">&nbsp;&nbsp;&nbsp;添加一条工作经历</div>
						</el-col>
					</el-row>
				
				
				
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark five">教育经历（选填）:</div>
						</el-col>
					</el-row>
					<div id="creatExpress" v-for="item in editPeop.listEducationExperience">
						<el-input placeholder="学校名称或培训单位:" class="boedeyell" v-model="item.school">
	
						</el-input>
						<div class="block">
							<el-date-picker v-model="item.startTime" class="boedeyell" align="right" type="date" placeholder="开始日期" :picker-options="pickerOptions1">
							</el-date-picker>
						</div>
						<div class="block">
							<el-date-picker class="boedeyell" v-model="item.endTime" type="date" placeholder="结束日期" :picker-options="pickerOptions0">
							</el-date-picker>
						</div>
						<el-input placeholder="专业或课程:" class="boedeyell" v-model="item.major">
							
						</el-input>
						<div id="fengeline">
						------------------------------------------------------------------------------------------------------------------------------------
						</div>
					</div>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple four el-icon-plus" @click="education">&nbsp;&nbsp;&nbsp;添加一条教育经历</div>
						</el-col>
					</el-row>
					<el-input placeholder="联系方式:" class="boedeyell" v-model="editPeop.telphone">

					</el-input>
					<div class="butt_last">
						<el-button type="primary" size="large" class="laege" @click="sursubmit">确认修改</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'adminUserEdit',
		data() {
			return {
				isShow:false,
				editPeop: {
					idCardPositive: "",
					idCard: "",
					name: "",
					marriage: "",
					origin: "",
					telphone: "",
					nickname: "",
					healthy: "",
					nation: "",
					sex: 1,
					birthday: "",
					address: "",
					id: "",
					isBlacklist: "",
					education: "",
					healthy: "",

					listEducationExperience: [{
						endTime: "",
						major: "",
						school: "",
						talentId: "",
						startTime: "",
						id: ""
					}],
					listFamilyMembers: [{
						id: 29,
						relationship: "",
						relativesName: "",
						relativesPhone: "",
						talentId: 15
					}],
					listWorkExperience: [{
						company: "",
						endTime: "",
						id: 1,
						job: "",
						leaveReason: "",
						startTime: 1490014721000,
						talentId: "",
						witness: "",
						witnessPhone: ""
					}]
				},
				input2: '',
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				pickerOptions1: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				}
			};
		},

		methods: {
			education() {			
				this.editPeop.listEducationExperience.push({
						endTime: "",
						major: "",
						school: "",
						talentId: "",
						startTime: "",
						id: ""
				});		
			},
			addExpression() {
				this.isShow = true;
				this.editPeop.listWorkExperience.push({
						company: "",
						endTime: "",
						id: 1,
						job: "",
						leaveReason: "",
						startTime: "",
						talentId: "",
						witness: "",
						witnessPhone: ""
				});
			},
			clearthisexpress(){
				this.isShow = false;
//				this.editPeop.listWorkExperience = isShow;
			},
			handleIconClick(ev) {
				console.log(ev);
			},
			sursubmit() {
				this.$http.post('/talent/modify', {
					id: this.$route.params.id,
					idCardPositive: this.editPeop.idCardPositive,

				}).then((response) => {
					const {
						errorCode,
						moreInfo,
					} = response.data;
					if(errorCode == 11001) {
						this.$notify({
							title: '修改成功',
							type: 'success',
						});
						this.$router.push({
							name: 'adminUserShow',
							params: {
								id: this.$route.params.id,
							}
						});
					} else {
						this.$notify.error({
							title: moreInfo,
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		mounted() {
			const id = this.$route.params.id;
			this.$http.get(`/talent/detail?id=${id}`).then((response) => {
				if(response.data.errorCode === 10000) {
					this.editPeop = response.data.data;
				}
			});
		}
	}
</script>
<style lang="scss" scope>
	#adminUserEdit {
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		left: 0px;
		overflow-y: scroll;
		margin: 10px;
		display: flex;
		flex-direction: column;
		.el-row {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
			.el-col {
				border-radius: 4px;
			}
			.bg-purple-dark {
				background: grey;
			}
			.grid-content {
				font-size: 16px;
				text-align: center;
				line-height: 36px;
				border-radius: 4px;
				min-height: 36px;
			}
		}
		#fengeline{
			width: 100%;
			height: 20px;
			margin-bottom: 20px;
			color: darkgray;			
		}
		#creatExpress{
			width: 100%;
			height: 100%;
		}
		#change_container {
			width: 100%;
			height: 100%;
			#createxpress {
				width: 100%;
				height: 100%;
			}
			.container {
				width: 800px;
				height: 100%;
				margin: 0 auto;
				font-size: 14px;
				.scend {
					text-align: start;
					font-family: "微软雅黑";
					font-weight: bold;
					text-indent: 60px;
				}
				.third {
					margin-top: 80px;
					text-align: start;
					font-family: "微软雅黑";
					font-weight: bold;
					text-indent: 60px;
				}
				.four {
					width: 100%;
					height: 100%;
					color: dodgerblue;
					text-align: center;
					font-family: "微软雅黑";
					font-weight: bold;
					cursor: pointer;
				}
				.five {
					margin-top: 60px;
					text-align: start;
					font-family: "微软雅黑";
					font-weight: bold;
					text-indent: 60px;
				}
				.butt_last {
					width: 100%;
					height: 60px;
					margin-top: 30px;
					text-align: center;
					.laege {
						width: 200px;
						height: 50px;
					}
				}
				.boedeyell {
					width: 60%;
					/*border: 1px solid darkgrey;*/
					margin-bottom: 20px;
					color: black;
					margin-left: 150px;
					border-radius: 4px;
				}
				.baohan {
					width: 100%;
					height: 300px;
					margin-bottom: 50px;
					display: flex;
					justify-content: space-around;
					.baohan_left {
						width: 400px;
						height: 100%;
						text-align: center;
						.image {
							margin-top: 40px;
							width: 300px;
							height: 260px;
							display: inline-block;
							vertical-align: middle;
						}
					}
					.baohan_right {
						width: 400px;
						height: 100%;
						.mar_30 {
							font-size: 16px;
							margin-top: 30px;
						}
						input[type=radio] {
							width: 16px;
							height: 16px;
							vertical-align: middle;
							margin-bottom: 4px;
						}
						.minzu {
							width: 120px;
							height: 20px;
							text-align: center;
							border-radius: 4px;
						}
					}
					span {
						font-size: 16px;
						width: 100%;
						height: 50px;
						line-height: 60px;
						display: block;
						text-indent: 20px
					}
				}
			}
		}
	}
</style>