
//I should have commented more :( Sorry....

public class Square 
{
	boolean[] val = new boolean[4];
	boolean randomized = false;
	int type, connections = 0;
	
	public Square()
	{
		connections = 0;
		randomized = false;
	}
	
	public void change(int value, boolean tf)
	{
		if(tf){
			val[value] = true;
			connections++;
			//System.out.println("Internal connections: "+connections);
		}
		else{
			val[value] = false;
			connections--;
		}
	}
	
	public int getConnections(){
		return(connections);
	}
	
	public void randomize()
	{
		randomized = true;
		int single =0;
		connections = 0;
		do{
			for(int i = 0; i< val.length; i++)
			{
				if(Math.random()>0.5)
				{
					val[i] = true;
					connections++;
				}
			}
		}while(connections==0);
		
		if(connections ==1)
		{
			//finding where the single line is coming from
			for(int j =0; j<val.length; j++)
			{
				if(val[j])
					single = j;
			}
			//making a straight line (type = 2), opposite must be true
			double rando = Math.random();
			if(rando>0.5)
			{
				if(single<=1)
					val[single+2] = true;
				else
					val[single-2] = true;
					
			}
			//making an elbow (type = 1) (clockwise)
			else if (rando>0.25) //Changed this to rando....from Math.random() evaluated twice, don't know if it changes anyhting
			{						//but it should now be 50/50 whethere the elbow is clockwise or counter-clockwise
				if(single<=2)
					val[single+1] = true;
				else
					val[0] = true;
			}
			//also making an elbow (counter-clockwise)
			else
			{
				if(single>=1)
					val[single-1] = true;
				else
					val[3] = true;
			}
			connections = 2;
		}
	}
	
	
	public boolean getR()
	{
		return(randomized);
	}
	
	public int getType()
	{
		int type = 2;
		if(connections == 0){
			type = 0;
		}
		else if(connections == 3){
			type = 3;
		}
		else if(connections == 4){
			type = 4;
		}
		else if(connections == 2)
		{
			if(val[0]){
				if(val[3]){
					type = 1;
				}
				else if(val[1]){
					type = 1;
				}
				else{
					type = 2;
				}
			}
			else if(val[2]){
				type = 1;
			}
			//else type remains 2 (as assigned at initialization)
		}
		else{
			System.out.println("ERROR, Connections:"+connections);
			type = -20;
		}
		return(type);
	}
	//{return connections;}
}
