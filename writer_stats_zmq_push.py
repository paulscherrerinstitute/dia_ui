import zmq
from time import sleep, gmtime, strftime
from random import randint

context = zmq.Context()
socketPub = context.socket(zmq.PUB)
socketPub.bind("tcp://*:8088")

# Filters for each one of the components 
topicWriter = 'statisticsWriter'

# 'slow joiner' problem : basically in order for 
# PUB/SUB to work, after connecting and binding
# is necessary some handshaking time for not 
# losing the packages.
# http://zguide.zeromq.org/page:all 
sleep(2)

#############################
# WRITER STATISTICS MONITOR # 
#############################

# Start
# writerStartJson = {"statistics_wr_start": {
#             "first_frame_id": randint(0, 9),
#             "n_frames": 100,
#             "output_file": "tmp/file_name",
#             "user_id": randint(10000, 999999),
#             "timestamp": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
#             "compression_method": "comp_name"}
#             }
# socketPub.send_string(topicWriter, zmq.SNDMORE)
# socketPub.send_json(writerStartJson)

# print("sleeping 5... before adv")
# sleep(5)

# # # Error
# # writerErrorJson ={"statistics_wr_error":  {
# #         "error_def": "text",
# #         "stack_frame": "text",
# #         "enable": "true",
# #         "user_msg": "text"}
# #         }
# # socketPub.send_string(topicWriter, zmq.SNDMORE)
# # socketPub.send_json(writerErrorJson)



# # # Writer Advanced Statistics
# for i in range(50):
#         writerAdvJson ={"statistics_wr_adv": {
#         "n_written_frames": i,
#         "n_received_frames": randint(0, 9),
#         "n_free_slots": randint(0, 9),
#         "processing_rate": randint(0, 9),
#         "receiving_rate": randint(0, 9),
#         "writting_rate": randint(50, 99),
#         "avg_compressed_size": randint(0, 9)}
#         }
#         socketPub.send_string(topicWriter, zmq.SNDMORE)
#         socketPub.send_json(writerAdvJson)
#         i += 1
#         print(i)

# # # Error
# writerErrorJson ={"statistics_wr_error":  {
#         "error_def": "text",
#         "stack_frame": "text",
#         "enable": "true",
#         "user_msg": "text"}
#         }
# socketPub.send_string(topicWriter, zmq.SNDMORE)
# socketPub.send_json(writerErrorJson)
# print("sleeping a bit after the error.. and starting again...")
# sleep(15)
# # # Finish
# # writerFinishJson = {"statistics_wr_finish": {
# #         "end_time": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
# #         "enable": "true",
# #         "n_total_written_frames": i}
# #         }
# # socketPub.send_string(topicWriter, zmq.SNDMORE)
# # socketPub.send_json(writerFinishJson)

# sleep(5)
writerStartJson = {"statistics_wr_start": {
            "first_frame_id": randint(0, 9),
            "n_frames": 100,
            "output_file": "tmp/file_name",
            "user_id": randint(10000, 999999),
            "enable": "true",
            "timestamp": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
            "compression_method": "comp_name"}
            }
socketPub.send_string(topicWriter, zmq.SNDMORE)
socketPub.send_json(writerStartJson)

print("sleeping 5... before adv")
sleep(5)



# # Writer Advanced Statistics
for i in range(100):
        writerAdvJson ={"statistics_wr_adv": {
        "n_written_frames": i,
        "n_received_frames": randint(0, 9),
        "n_free_slots": randint(0, 9),
        "enable": "true",
        "processing_rate": randint(0, 9),
        "receiving_rate": randint(0, 9),
        "writting_rate": randint(50, 99),
        "avg_compressed_size": randint(0, 9)}
        }
        socketPub.send_string(topicWriter, zmq.SNDMORE)
        socketPub.send_json(writerAdvJson)
        i += 1
        print(i)

# Error
# writerErrorJson ={"statistics_wr_error":  {
#         "error_def": "text",
#         "stack_frame": "text",
#         "enable": "true",
#         "user_msg": "text"}
#         }
# socketPub.send_string(topicWriter, zmq.SNDMORE)
# socketPub.send_json(writerErrorJson)

# # Finish
writerFinishJson = {"statistics_wr_finish": {
        "end_time": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
        "enable": "true",
        "n_total_written_frames": i}
        }
socketPub.send_string(topicWriter, zmq.SNDMORE)
socketPub.send_json(writerFinishJson)