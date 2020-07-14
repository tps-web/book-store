 <template>
   <div class="title">
     <div class="left">
      	<div style="width: 28px;height: 2px; background-color: #ccc;margin: 2px;"></div>
     	<div style="width: 12px;height: 2px; background-color: #ccc;margin: 2px;" ></div>
     	<div style="width: 8px;height: 2px; background-color: #ccc;margin: 2px;"></div>
     </div>
     <div>{{headline}}</div>
     <div class="rigth">
        <div style="width: 8px;height: 2px; background-color: #ccc;margin: 2px;"></div>
     	<div style="width: 12px;height: 2px; background-color: #ccc;margin: 2px;"></div>
     	<div style="width: 28px;height: 2px; background-color: #ccc;margin: 2px;"></div>
     </div>
    </div>    
</template>

<script>

export default {
    props:{
        headline:String,
    },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	font-size: 16px;
	font-weight:700;
	display: flex;
	justify-content:center;
}
.left{
	margin: auto 6px;
	transform:rotate(180deg);
}
.rigth{
	margin: auto 6px;
}
</style>
