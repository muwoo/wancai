<template>
	<div id="incomeMiddleMan">
		<div class="itemId">
			项目ID：1087萧山一号仓
		</div>
		<div class="searchsalary">
			<div class="block">
				<el-date-picker v-model="mouths" type="month" placeholder="2016年6月">
				</el-date-picker>
			</div>
			<div class="nameinput">
				<span>姓名:</span>
				<el-input v-model="name" placeholder="请输入姓名"></el-input>
			</div>
			<div class="nameinput">
				<span>身份证号:</span>
				<el-input v-model="mouths" placeholder="身份证号"></el-input>
			</div>
			<el-button class="searbtn" type="primary">查询记录</el-button>
		</div>
		<el-button type="primary">上月发放</el-button>
		<div class="listdeatil">
			<el-table :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="name" align="center" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="idCard" align="center" label="身份证号" width="240">
				</el-table-column>
				<el-table-column label="月份" align="center" width="120">
					<template scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
				<el-table-column prop="yongjin" align="center" label="佣金明细" width="120">
					<template scope="scope">
						<el-button @click="handleClick" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="yujiincome" align="center" label="预计收入" width="120">
				</el-table-column>
				<el-table-column prop="nowincome" align="center" label="实际收入" width="120">
				</el-table-column>
				<el-table-column prop="status" align="center" label="状态" width="120">
				</el-table-column>
				<el-table-column prop="privide" align="center" label="操作" width="120">
					<template scope="scope">
						<el-button size="small" @click="changeyongjin(scope.$index, scope.row)" type="danger">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog v-model="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="实际收入" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogFormVisible = false">确定修改</el-button>
				<el-button @click="dialogFormVisible = false">取 消</el-button>			
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'incomeMiddleMan',
		data() {
			return {
				mouths: '',
				name: "zimogod",
				tableData3: [{
					date: '16年05月',
					name: '王小虎',
					idCard: 640222199005261212,
					yujiincome: '1000',
					nowincome: '800',
					yongjin: '查看',
					status: '未发放',
					privide: ''
				}],
				dialogFormVisible: false,
				 form: {
          name: 500,
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
				multipleSelection: []
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleClick() {
				console.log(1);
			},
			changeyongjin(index, row){
				this.dialogFormVisible = true;
			}
		}
	};
</script>
<style lang="scss" scoped>
	#incomeMiddleMan {
		width: 100%;
		height: 100%;
		.itemId {
			width: 100%;
			height: 30px;
			padding: 10px 0;
			line-height: 30px;
		}
		.searchsalary {
			width: 100%;
			height: 40px;
			padding-bottom: 20px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.nameinput {
				width: 25%;
				height: 40px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				span {
					width: 160px;
					height: 40px;
					display: inline-block;
					text-align: center;
					line-height: 40px;
				}
			}
			.searbtn {
				margin-left: 30px;
			}
		}
		.listdeatil {
			width: 100%;
			height: 100%;
			padding-top: 30px;
		}
	}
</style>