from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView
from daily_game.models import Daily_Game
import datetime
from datetime import date
import random
from daily_game.wordlist import conun_list
import calendar
from calendar import HTMLCalendar

from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


def do_maths(a, b):
    actions_list = ["add", "sub", "mul", "div"]
    action = random.choice(actions_list)
    print( a , b , action )

    if action == "add":
        return a + b
    elif action == "sub":
        if a > b:
            return int( a - b )
        elif b > a:
            return int( b-a )
    elif action == "mul":
        return int(a * b)
    elif action == "div":
        if (a > b) and (a % b == 0):
            return int( a / b )
        elif (b > a) and ( b % a == 0 ):
            return int( b / a )
        else:
            return int(a + b)
    else:
        print('this should never happen')

# @login_required
def IndexView(request):

#check for [] array first !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
    # game = Daily_Game.objects.all().order_by('-score_total')[:10]
    game = Daily_Game.objects.all().order_by('-date')
    mydate = Daily_Game.objects.all().filter(date = datetime.date.today())
    players = Daily_Game.objects.all().filter(date = datetime.date.today()).order_by('player')

    if mydate:
        return render(request, 'daily_game/daily_index.html' , {
            'context' : mydate, 
            'context1' : game,
            'players'  :players,
        })

    else:
#generate letters for word game
        consonants =[  "B", "C", "D", "F", "G", "H", "J", "K", "L",
                        "M", "N", "P", "Q", "R", "S", "T", "V", "W",
                        "X", "Y", "Z", "B", "C", "D", "F", "G", "H",
                        "K", "L", "M", "N", "P", "R", "S", "T", "V", "W"
                    ]
        vowels = ["A", "E", "I", "O", "U", "A", "E", "O", "E", "O"]

#choose letters
        my_str = ''
        for cons in range(6):
            my_str += random.choice(consonants)
        for vows in range(3):
            my_str += random.choice(vowels)
#        my_str = random.sample(my_str, len(my_str))

#choose numbers for the numbers game and generate a target
        large_nums = [25, 50, 75, 100]
        small_nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        my_nums = []

        lrg = random.choice(large_nums)
        my_nums.append(lrg)

        for sml in range(5):
            sml = random.choice(small_nums)
            my_nums.append(sml)

        main_nums = my_nums[:]
                
        i = 0
        while i < 5:
            index_a = my_nums.index(random.choice(my_nums))
            num_a = int( my_nums.pop(index_a) )

            index_b = my_nums.index(random.choice(my_nums))
            num_b = int( my_nums.pop(index_b) )

            target = do_maths(num_a , num_b)
            my_nums.append(target)
            print(type(target))
            if i == 4:
                print('inside if 4')
                if (target < 101) or (target > 999 ):
                    my_nums = main_nums[:]
                    print('i ',i, 'my_nums ', my_nums,' main_nums ', main_nums)
                    i = 0
                else:
                    i += 1
            else:
                i += 1

            my_num = str(main_nums)
            my_num = my_num.replace('[','')
            my_num = my_num.replace(']','')
            print(type(my_num))

        #get conundrum    
        conundrum = random.choice(conun_list)
        print(conundrum)

        obj = Daily_Game.objects.create(letters=my_str, numbers=my_num, num_target=target, conundrum=conundrum)
        obj.save()

        #print(main_nums, '\n', my_num, '\n', target)
        return render(request, 'daily_game/daily_index.html' , {
            'context' : mydate ,
            'players' : players,
        })

# @login_required
def LettersView(request):
    game = Daily_Game.objects.all()
    mydate = Daily_Game.objects.all().filter(date = datetime.date.today())
    if (mydate):
            return render(request, 'daily_game/daily_letters.html' , {
                'context' : mydate ,
            })

# @login_required
def NumbersView(request):
    game = Daily_Game.objects.all()
    mydate = Daily_Game.objects.all().filter(date = datetime.date.today())
    if (mydate):
            return render(request, 'daily_game/daily_numbers.html' , {
                'context' : mydate ,
            })

# @login_required
def ConunView(request):
    game = Daily_Game.objects.all()
    mydate = Daily_Game.objects.all().filter(date = datetime.date.today())

    return render(request, 'daily_game/daily_word.html' , {
            'context' : mydate ,
        })


def ResultsView(request):

    game = Daily_Game.objects.all().order_by('-score_total')[:10]
    mydate = Daily_Game.objects.all().filter(date = datetime.date.today())

    if (mydate):

        if request.method == "POST":
            new_scores = Daily_Game( 
                score_letters = request.POST[ "letScore"],
                score_numbers = request.POST["numScore"],
                score_conundrum = request.POST["conScore"],    
                score_total = request.POST["total"],   
                player = request.user )
            
            new_scores.save()
            request.user.daily_game.add(new_scores)

            print("Scores Updated Scucessfully") 

    return render(request, 'daily_game/results.html', {
        'context1' : game ,
    })




def FinishView(request):
    game = Daily_Game.objects.all()
    mydate = Daily_Game.objects.all().filter(date = datetime.date.today())

    if request.method == "POST":
        score_letters = request.POST[ "letScore"]
        score_numbers = request.POST["numScore"]
        score_conundrum = request.POST["conScore"]    
        score_total = request.POST["total"]   

        print(score_letters,' ',score_numbers,' ', score_conundrum,' ', score_total) 

    return render(request, 'finishgame1.html')
#obj = Daily_Game.objects.create(letters=my_str, numbers=my_num, num_target=target, conundrum=conundrum)
