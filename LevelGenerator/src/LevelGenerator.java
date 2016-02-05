/**
 * Used to generate a level based on grid size input
 * pre: grid size and number of levels to generate passed in
 * post: strings defining the specified number of levels are printed
 */

import java.util.Scanner;
public class LevelGenerator 
{
	public static void main(String[]args)
	{
		Scanner input = new Scanner(System.in);
		int gridSize, numLvl;
		
		//main loop (each iteration allows the user to generate a set of levels)
		do
		{
			System.out.print("Please enter the grid size: ");
			gridSize = input.nextInt();
			System.out.print("How many levels to generate?: ");
			numLvl = input.nextInt();
			
			for(int i=0; i<numLvl; i++)
			{
				System.out.println(generateLevel(gridSize, i));
			}
			
		}
		while(true);
		
		
	}
	
	public static String generateLevel(int size, int level)
	{
		String levelDef = "";
		
		Square[][] square = new Square[size][size];
		//initializing squares
				for(int row=0; row <size; row++)
				{
					for(int col=0; col <size; col++)
					{
						square[row][col] = new Square();
					}
				}
		
		
		//randomizing squares
		for(int row=0; row <size; row++)
		{
			for(int col=row%2; col <size; col+=2)
			{
				square[row][col].randomize();
				//System.out.println(row+","+col+"-"+"randomized");
			}
		}
		//matching squares
		int single = 0;
		boolean repaired = false;
		for(int row=0; row <size; row++){
			for(int col=0; col <size; col++){
				if(square[row][col].getR() == false){
					//System.out.println(buildString(square, size, level));
					matchSquare(square, row, col, size);
					if(square[row][col].getConnections()==1){
						repaired = false;
						for(int i=0;i<4;i++){
							if(square[row][col].val[i] && repaired == false){
								repaired = true;
								single = i;
								if(single==0){
									square[row][col].change(2, true);
									if(row<size-1){
										square[row+1][col].change(0, true);
									}
									
								}
								else if(single==1){
									square[row][col].change(3, true);
									if(col>0){
										square[row][col-1].change(0, true);
									}
								}
								else if(single==2){
									square[row][col].change(0, true);
									if(row>0){
										square[row-1][col].change(2, true);
									}
								}
								else if(single==3){
									square[row][col].change(1, true);
									if(col<size-1){
										square[row][col+1].change(3, true);
									}
								}
								else{
									System.out.println("Something is wrong");
								}
								//System.out.println("After reparation, connections: "+square[row][col].getConnections());
								
								
								
								/*if(single<=1){	
									square[row][col].change(single+2, true);
									//square[row+1-(single%2)][col+(single %2)].change(single, true);
								}
								else{
									square[row][col].change(single-2, true);
									//square[row-1+(single%2)][col-(single %2)].change(single, true);
								}*/
								
							}
							
							
						}
					}
				}
			}
		}
		
		levelDef = buildString(square, size, level);
		
		/*for(int row=0; row <size; row++)
		{
			for(int col=0; col <size; col++)
			{
				System.out.print(row+","+col+"- top: "+square[row][col].val[0]);
				System.out.print(" right: "+square[row][col].val[1]);
				System.out.print(" bottom: "+square[row][col].val[2]);
				System.out.println(" left: "+square[row][col].val[3]);
			}
		}*/
		
		return levelDef;
	}
	
	public static void matchSquare(Square[][] boxes, int r, int c, int grid)
	{
		//System.out.println("Matching - r:"+r+", c:"+c+", grid:"+grid+", Connections:"+boxes[r][c].connections);
		
		if(r<grid-1){
			
			if(boxes[r+1][c].val[0])
			{
				boxes[r][c].change(2, true);
			}
			//System.out.println("Below-top:"+boxes[r+1][c].val[0] +" , This-bottom:"+boxes[r][c].val[2]);
		}
		
		if(c<grid-1){
			if(boxes[r][c+1].val[3])
			{
				boxes[r][c].change(1, true);
			}
			//System.out.println("Right-left:"+boxes[r][c+1].val[3] +" , This-right:"+boxes[r][c].val[1]);
		}
		if(r>0){
			if(boxes[r-1][c].val[2])
			{
				boxes[r][c].change(0, true);
			}
			//System.out.println("Above-bottom:"+boxes[r-1][c].val[2] +" , This-top:"+boxes[r][c].val[0]);
		}
		if(c>0){
			if(boxes[r][c-1].val[1])
			{
				boxes[r][c].change(3, true);
			}
			//System.out.println("Left-right:"+boxes[r][c-1].val[1] +" , This-left:"+boxes[r][c].val[3]);
		}
		//System.out.println("Connections: "+boxes[r][c].getConnections());
	}
	
	public static String buildString(Square[][] boxes, int size, int level)
	{
		String levelString = "level["+(size-3)+"]["+level+"] = new Array(";
		for(int row = 0; row< size; row++){
			levelString += "/*row"+(row+1)+"*/";
			for(int col = 0; col<size; col++){
				levelString += boxes[row][col].getType();
				if(!(row == size-1 && col == size-1)){
					levelString += ",";
				}
			}
		}
		levelString += ");";
		return levelString;
	}
}
