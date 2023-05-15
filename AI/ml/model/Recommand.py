from keras.models import load_model
import h5py
# from ml.models import LikeContent
from keras import initializers
from keras.regularizers import l1, l2, l1_l2
from keras.models import Sequential, Model
from keras.layers import Embedding, Input, Dense, concatenate, Reshape, Flatten, Dropout, multiply
from Dataset import Dataset

def init_normal(shape, dtype='float32', name=None):
    return initializers.RandomNormal(mean=0.0, stddev=0.01, seed=None)(shape, dtype=dtype)

def Recommands(user_id):
    model = load_model('./ml/model/Pretrain/ml-1m_NeuMF_8_[64,32,16,8]_1683173823.h5')
    dataset = Dataset('./ml/model/Data/ml-1m')
    train, testRatings, testNegatives = dataset.trainMatrix, dataset.testRatings, dataset.testNegatives
    num_users, num_items = train.shape

    # users_id = LikeContent.objects.filter(user=user_id)
    # items_id = LikeContent.objects.filter()
    user_input = Embedding(input_dim = num_users, output_dim = 10, name = 'user_input',
                                  embeddings_initializer = init_normal, embeddings_regularizer = l2(0), input_length=1)
    item_input = Embedding(input_dim = num_items, output_dim = 10, name = 'item_input',
                                  embeddings_initializer = init_normal, embeddings_regularizer = l2(0), input_length=1)

    predictions = model.predict([user_input, item_input])
    print('predictions[:10] :', predictions[:10])
    return predictions[:10]
print(Recommands(1))